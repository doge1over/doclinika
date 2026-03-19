import { NextRequest, NextResponse } from 'next/server'
import {
    verifyPassword,
    checkRateLimit,
    recordFailedAttempt,
    clearAttempts,
    createToken,
    validateToken,
    getTokenFromHeaders,
    getClientIP,
} from '@/lib/auth'

// POST /api/auth — логин
export async function POST(req: NextRequest) {
    const ip = getClientIP(req.headers)

    const rateCheck = checkRateLimit(ip)
    if (!rateCheck.allowed) {
        return NextResponse.json(
            { error: 'Слишком много попыток', retryAfterSeconds: rateCheck.retryAfterSeconds },
            { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSeconds || 60) } }
        )
    }

    const body = await req.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
        return NextResponse.json({ error: 'Пароль не указан' }, { status: 400 })
    }

    if (!verifyPassword(password)) {
        recordFailedAttempt(ip)
        const updatedCheck = checkRateLimit(ip)
        return NextResponse.json(
            { error: 'Неверный пароль', attemptsLeft: updatedCheck.attemptsLeft },
            { status: 401 }
        )
    }

    clearAttempts(ip)
    const token = createToken()

    return NextResponse.json({ success: true, token })
}

// GET /api/auth — проверка токена
export async function GET(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    const valid = validateToken(token)
    return NextResponse.json({ authenticated: valid })
}