import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export const PERMISSIONS = ['education', 'documents', 'specialists', 'animals', 'about', 'news'] as const
export type Permission = typeof PERMISSIONS[number]
export type Role = 'admin' | 'editor'

export interface UserRecord {
    id: string
    username: string
    name: string
    role: Role
    permissions: Permission[]
    passwordHash: string
    salt: string
    active: boolean
    createdAt: string
}

export interface SessionUser {
    id: string
    username: string
    name: string
    role: Role
    permissions: Permission[]
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')
const SESSION_TTL = (Number(process.env.SESSION_TTL_HOURS) || 8) * 60 * 60 * 1000

function secret() {
    const value = process.env.SESSION_SECRET || (process.env.NODE_ENV !== 'production' ? 'doclinika-local-development-secret-change-me' : '')
    if (value.length < 32) throw new Error('SESSION_SECRET должен содержать минимум 32 символа')
    return value
}

function encode(value: unknown) { return Buffer.from(JSON.stringify(value)).toString('base64url') }
function sign(payload: Record<string, unknown>) {
    const header = encode({ alg: 'HS256', typ: 'JWT' })
    const body = encode(payload)
    const signature = crypto.createHmac('sha256', secret()).update(`${header}.${body}`).digest('base64url')
    return `${header}.${body}.${signature}`
}

function verify(token: string): Record<string, unknown> | null {
    try {
        const [header, body, signature] = token.split('.')
        if (!header || !body || !signature) return null
        const expected = crypto.createHmac('sha256', secret()).update(`${header}.${body}`).digest()
        const actual = Buffer.from(signature, 'base64url')
        if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
        return typeof payload.exp === 'number' && Date.now() < payload.exp ? payload : null
    } catch { return null }
}

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString('hex')) {
    const hash = crypto.scryptSync(password, salt, 64).toString('hex')
    return { hash, salt }
}

export function passwordIsStrong(password: string) {
    return password.length >= 10 && /[A-Za-zА-Яа-я]/.test(password) && /\d/.test(password)
}

export function readUsers(): UserRecord[] {
    try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')) } catch { return [] }
}

export function saveUsers(users: UserRecord[]) {
    fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true })
    const temp = `${USERS_FILE}.${process.pid}.tmp`
    fs.writeFileSync(temp, JSON.stringify(users, null, 2), { encoding: 'utf8', mode: 0o600 })
    fs.renameSync(temp, USERS_FILE)
}

export function verifyCredentials(username: string, password: string): SessionUser | null {
    const user = readUsers().find(item => item.username.toLowerCase() === username.toLowerCase() && item.active)
    if (user) {
        const candidate = crypto.scryptSync(password, user.salt, 64)
        const stored = Buffer.from(user.passwordHash, 'hex')
        if (candidate.length === stored.length && crypto.timingSafeEqual(candidate, stored)) return publicUser(user)
    }
    // Backward-compatible bootstrap admin. Set ADMIN_USERNAME and ADMIN_PASSWORD in production.
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    if (adminPassword && username === adminUsername) {
        const a = crypto.createHash('sha256').update(password).digest()
        const b = crypto.createHash('sha256').update(adminPassword).digest()
        if (crypto.timingSafeEqual(a, b)) return { id: 'environment-admin', username: adminUsername, name: 'Главный администратор', role: 'admin', permissions: [...PERMISSIONS] }
    }
    return null
}

export function publicUser(user: UserRecord): SessionUser {
    return { id: user.id, username: user.username, name: user.name, role: user.role, permissions: user.role === 'admin' ? [...PERMISSIONS] : user.permissions }
}

export function createToken(user: SessionUser) {
    return sign({ ...user, iat: Date.now(), exp: Date.now() + SESSION_TTL, jti: crypto.randomBytes(16).toString('hex') })
}

export function getSession(token: string | null): SessionUser | null {
    if (!token) return null
    const payload = verify(token)
    if (!payload || typeof payload.username !== 'string' || (payload.role !== 'admin' && payload.role !== 'editor')) return null
    if (payload.id !== 'environment-admin') {
        const current = readUsers().find(user => user.id === payload.id && user.active)
        if (!current) return null
        return publicUser(current)
    }
    return { id: String(payload.id), username: payload.username, name: String(payload.name), role: 'admin', permissions: [...PERMISSIONS] }
}

export function hasPermission(user: SessionUser | null, permission: Permission) {
    return !!user && (user.role === 'admin' || user.permissions.includes(permission))
}

export function validateToken(token: string | null) { return getSession(token) !== null }
export function getTokenFromHeaders(headers: Headers) {
    const auth = headers.get('authorization')
    if (auth?.startsWith('Bearer ')) return auth.slice(7)
    const cookie = headers.get('cookie') || ''
    const match = cookie.match(/(?:^|;\s*)admin_session=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : null
}
export function getClientIP(headers: Headers) { return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || '127.0.0.1' }

const attempts = new Map<string, { count: number; first: number; lockedUntil: number }>()
export function checkRateLimit(key: string) {
    const now = Date.now(); const item = attempts.get(key)
    if (!item || now - item.first > 15 * 60_000) { attempts.delete(key); return { allowed: true, attemptsLeft: 5 } }
    if (item.lockedUntil > now) return { allowed: false, attemptsLeft: 0, retryAfterSeconds: Math.ceil((item.lockedUntil - now) / 1000) }
    return { allowed: item.count < 5, attemptsLeft: Math.max(0, 5 - item.count) }
}
export function recordFailedAttempt(key: string) {
    const now = Date.now(); const item = attempts.get(key)
    if (!item || now - item.first > 15 * 60_000) attempts.set(key, { count: 1, first: now, lockedUntil: 0 })
    else { item.count++; if (item.count >= 5) item.lockedUntil = now + 30 * 60_000 }
}
export function clearAttempts(key: string) { attempts.delete(key) }
