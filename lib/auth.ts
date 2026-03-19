import crypto from 'crypto'

// ─── Конфигурация ───
const SESSION_TTL = (Number(process.env.SESSION_TTL_HOURS) || 8) * 60 * 60 * 1000 // мс
const MAX_LOGIN_ATTEMPTS = 5       // макс. попыток
const RATE_LIMIT_WINDOW = 15 * 60 * 1000  // 15 мин окно
const LOCKOUT_DURATION = 30 * 60 * 1000   // 30 мин блокировка после превышения

// ─── Хранилища (in-memory, сбрасываются при перезапуске сервера) ───
interface Session {
    token: string
    createdAt: number
    ip: string
}

interface LoginAttempt {
    count: number
    firstAttempt: number
    lockedUntil: number | null
}

const sessions = new Map<string, Session>()
const loginAttempts = new Map<string, LoginAttempt>()

// ─── Хэширование пароля ───
function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
}

// ─── Проверка пароля ───
export function verifyPassword(inputPassword: string): boolean {
    const storedPassword = process.env.ADMIN_PASSWORD
    if (!storedPassword) {
        console.error('ADMIN_PASSWORD не задан в .env')
        return false
    }
    // Сравнение через timing-safe для защиты от timing attacks
    const inputHash = hashPassword(inputPassword)
    const storedHash = hashPassword(storedPassword)
    try {
        return crypto.timingSafeEqual(
            Buffer.from(inputHash, 'hex'),
            Buffer.from(storedHash, 'hex')
        )
    } catch {
        return false
    }
}

// ─── Rate Limiting ───
export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number; attemptsLeft?: number } {
    const now = Date.now()
    const attempt = loginAttempts.get(ip)

    if (!attempt) {
        return { allowed: true, attemptsLeft: MAX_LOGIN_ATTEMPTS }
    }

    // Проверяем блокировку
    if (attempt.lockedUntil && now < attempt.lockedUntil) {
        const retryAfter = Math.ceil((attempt.lockedUntil - now) / 1000)
        return { allowed: false, retryAfterSeconds: retryAfter }
    }

    // Сброс если окно истекло
    if (now - attempt.firstAttempt > RATE_LIMIT_WINDOW) {
        loginAttempts.delete(ip)
        return { allowed: true, attemptsLeft: MAX_LOGIN_ATTEMPTS }
    }

    // Сброс блокировки если время вышло
    if (attempt.lockedUntil && now >= attempt.lockedUntil) {
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

// ─── Управление сессиями ───
export function createSession(ip: string): string {
    // Удаляем старые сессии этого IP
    for (const [token, session] of sessions) {
        if (session.ip === ip) sessions.delete(token)
    }

    const secret = process.env.SESSION_SECRET || 'fallback-change-me'
    const raw = `${ip}-${Date.now()}-${crypto.randomBytes(32).toString('hex')}`
    const token = crypto.createHmac('sha256', secret).update(raw).digest('hex')

    sessions.set(token, {
        token,
        createdAt: Date.now(),
        ip,
    })

    // Чистим просроченные сессии
    cleanExpiredSessions()

    return token
}

export function validateSession(token: string | null): boolean {
    if (!token) return false

    const session = sessions.get(token)
    if (!session) return false

    // Проверяем TTL
    if (Date.now() - session.createdAt > SESSION_TTL) {
        sessions.delete(token)
        return false
    }

    return true
}

export function destroySession(token: string): void {
    sessions.delete(token)
}

function cleanExpiredSessions(): void {
    const now = Date.now()
    for (const [token, session] of sessions) {
        if (now - session.createdAt > SESSION_TTL) {
            sessions.delete(token)
        }
    }
}

// ─── Хелпер для извлечения токена из заголовков ───
export function getTokenFromHeaders(headers: Headers): string | null {
    const auth = headers.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        return auth.slice(7)
    }
    return null
}

// ─── Хелпер для получения IP ───
export function getClientIP(headers: Headers): string {
    return headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || headers.get('x-real-ip')
        || '127.0.0.1'
}
