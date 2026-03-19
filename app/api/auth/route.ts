import { NextRequest, NextResponse } from 'next/server'
import {
    verifyPassword,
    checkRateLimit,
    recordFailedAttempt,
    clearAttempts,
    createSession,
    destroySession,
    getTokenFromHeaders,
    getClientIP,
    validateSession,
} from '@/lib/auth'

// POST /api/auth — логин
export async function POST(req: NextRequest) {
    const ip = getClientIP(req.headers)

    // Проверяем rate limit
    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
        return NextResponse.json(
            {
                error: 'Слишком много попыток',
                retryAfterSeconds: rateCheck.retryAfterSeconds,
            },
            {
                status: 429,
                headers: {
                    'Retry-After': String(rateCheck.retryAfterSeconds || 60),
                },
            }
        )
    }

    const body = await req.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
        return NextResponse.json({ error: 'Пароль не указан' }, { status: 400 })
    }

    // Проверяем пароль
    if (!verifyPassword(password)) {
        recordFailedAttempt(ip)
        const updatedCheck = checkRateLimit(ip)
        return NextResponse.json(
            {
                error: 'Неверный пароль',
                attemptsLeft: updatedCheck.attemptsLeft,
            },
            { status: 401 }
        )
    }

    // Успешный вход — сбрасываем счётчик, создаём сессию
    clearAttempts(ip)
    const token = createSession(ip)

    return NextResponse.json({ success: true, token })
}

// DELETE /api/auth — выход
export async function DELETE(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    if (token) {
        destroySession(token)
    }
    return NextResponse.json({ success: true })
}

// GET /api/auth — проверка сессии
export async function GET(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    const valid = validateSession(token)
    return NextResponse.json({ authenticated: valid })
}
