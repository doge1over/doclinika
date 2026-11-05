import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, clearAttempts, createToken, getClientIP, getSession, getTokenFromHeaders, recordFailedAttempt, verifyCredentials } from '@/lib/auth'
import { writeAudit } from '@/lib/audit'

export async function POST(req: NextRequest) {
    const ip = getClientIP(req.headers)
    const rate = checkRateLimit(ip)
    if (!rate.allowed) return NextResponse.json({ error: 'Слишком много попыток входа', retryAfterSeconds: rate.retryAfterSeconds }, { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds || 60) } })
    let body: unknown
    try { body = await req.json() } catch { return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 }) }
    const data = body as { username?: unknown; password?: unknown }
    if (typeof data.password !== 'string') return NextResponse.json({ error: 'Введите пароль' }, { status: 400 })
    const user = verifyCredentials(typeof data.username === 'string' ? data.username.trim() : 'admin', data.password)
    if (!user) { recordFailedAttempt(ip); writeAudit(null,'login_failed','auth',ip,typeof data.username==='string'?data.username:'admin'); return NextResponse.json({ error: 'Неверный логин или пароль', attemptsLeft: checkRateLimit(ip).attemptsLeft }, { status: 401 }) }
    clearAttempts(ip)
    const response=NextResponse.json({ success: true, user }, { headers: { 'Cache-Control': 'no-store' } })
    response.cookies.set('admin_session',createToken(user),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:(Number(process.env.SESSION_TTL_HOURS)||8)*60*60})
    writeAudit(user,'login_success','auth',ip)
    return response
}

export async function DELETE(req: NextRequest) {
    const user=getSession(getTokenFromHeaders(req.headers)); const response=NextResponse.json({success:true})
    response.cookies.set('admin_session','',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0})
    writeAudit(user,'logout','auth',getClientIP(req.headers)); return response
}

export async function GET(req: NextRequest) {
    const user = getSession(getTokenFromHeaders(req.headers))
    return NextResponse.json({ authenticated: !!user, user }, { status: user ? 200 : 401, headers: { 'Cache-Control': 'no-store' } })
}
