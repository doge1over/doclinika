import crypto from 'crypto'

// ─── JWT (без внешних зависимостей) ───

function base64UrlEncode(data: string): string {
    return Buffer.from(data).toString('base64url')
}

function base64UrlDecode(str: string): string {
    return Buffer.from(str, 'base64url').toString('utf-8')
}

function getSecret(): string {
    const secret = process.env.SESSION_SECRET
    if (!secret || secret.length < 16) {
        throw new Error('SESSION_SECRET не задан или слишком короткий (мин. 16 символов)')
    }
    return secret
}

function sign(payload: Record<string, unknown>): string {
    const secret = getSecret()
    const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const body = base64UrlEncode(JSON.stringify(payload))
    const signature = crypto
        .createHmac('sha256', secret)
        .update(`${header}.${body}`)
        .digest('base64url')
    return `${header}.${body}.${signature}`
}

function verify(token: string): Record<string, unknown> | null {
    try {
        const parts = token.split('.')
        if (parts.length !== 3) return null

        const [header, body, signature] = parts
        const secret = getSecret()

        // Проверяем подпись
        const expectedSig = crypto
            .createHmac('sha256', secret)
            .update(`${header}.${body}`)
            .digest('base64url')

        // Timing-safe сравнение
        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
            return null
        }

        const payload = JSON.parse(base64UrlDecode(body))

        // Проверяем срок действия
        if (payload.exp && Date.now() > payload.exp) {
            return null
        }

        return payload
    } catch {
        return null
    }
}

// ─── Конфигурация ───
const SESSION_TTL = (Number(process.env.SESSION_TTL_HOURS) || 8) * 60 * 60 * 1000

// ─── Проверка пароля ───
function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
}

export function verifyPassword(inputPassword: string): boolean {
    const storedPassword = process.env.ADMIN_PASSWORD
    if (!storedPassword) {
        console.error('ADMIN_PASSWORD не задан в переменных окружения')
        return false
    }
    try {
        const inputHash = hashPassword(inputPassword)
        const storedHash = hashPassword(storedPassword)
        return crypto.timingSafeEqual(
            Buffer.from(inputHash, 'hex'),
            Buffer.from(storedHash, 'hex')
        )
    } catch {
        return false
    }
}

// ─── Создание токена ───
export function createToken(): string {
    return sign({
        role: 'admin',
        iat: Date.now(),
        exp: Date.now() + SESSION_TTL,
        jti: crypto.randomBytes(16).toString('hex'),
    })
}

// ─── Проверка токена ───
export function validateToken(token: string | null): boolean {
    if (!token) return false
    const payload = verify(token)
    return payload !== null && payload.role === 'admin'
}

// ─── Rate Limiting (per-instance, частичная защита на serverless) ───
const MAX_LOGIN_ATTEMPTS = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000
const LOCKOUT_DURATION = 30 * 60 * 1000

interface LoginAttempt {
    count: number
    firstAttempt: number
    lockedUntil: number | null
}

const loginAttempts = new Map<string, LoginAttempt>()

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number; attemptsLeft?: number } {
    const now = Date.now()
    const attempt = loginAttempts.get(ip)

    if (!attempt) return { allowed: true, attemptsLeft: MAX_LOGIN_ATTEMPTS }

    if (attempt.lockedUntil && now < attempt.lockedUntil) {
        return { allowed: false, retryAfterSeconds: Math.ceil((attempt.lockedUntil - now) / 1000) }
    }

    if (now - attempt.firstAttempt > RATE_LIMIT_WINDOW || (attempt.lockedUntil && now >= attempt.lockedUntil)) {
        loginAttempts.delete(ip)
        return { allowed: true, attemptsLeft: MAX_LOGIN_ATTEMPTS }
    }

    const left = MAX_LOGIN_ATTEMPTS - attempt.count
    return { allowed: left > 0, attemptsLeft: Math.max(0, left) }
}

export function recordFailedAttempt(ip: string): void {
    const now = Date.now()
    const attempt = loginAttempts.get(ip)

    if (!attempt || now - attempt.firstAttempt > RATE_LIMIT_WINDOW) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now, lockedUntil: null })
        return
    }
    attempt.count++
    if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
        attempt.lockedUntil = now + LOCKOUT_DURATION
    }
}

export function clearAttempts(ip: string): void {
    loginAttempts.delete(ip)
}

// ─── Хелперы ───
export function getTokenFromHeaders(headers: Headers): string | null {
    const auth = headers.get('authorization')
    if (auth && auth.startsWith('Bearer ')) return auth.slice(7)
    return null
}

export function getClientIP(headers: Headers): string {
    return headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || headers.get('x-real-ip')
        || '127.0.0.1'
}