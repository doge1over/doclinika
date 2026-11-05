import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { randomUUID } from 'crypto'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
const LEGAL_VERSION = '2026-09-07'
const MAX_BODY_BYTES = 100 * 1024
const attempts = new Map<string, { count: number; resetAt: number }>()

function response(status: number, message: string) {
    return NextResponse.json({ success: status < 400, message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

function clientIp(req: NextRequest) {
    return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function isRateLimited(ip: string) {
    const now = Date.now()
    const current = attempts.get(ip)
    if (!current || current.resetAt <= now) {
        attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
        return false
    }
    current.count += 1
    return current.count > 5
}

function cleanText(value: unknown, max = 5000) {
    return typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
    try {
        const raw = await req.text()
        if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return response(413, 'Заявка слишком большая.')
        const body = JSON.parse(raw) as Record<string, unknown>
        const ip = clientIp(req)
        if (isRateLimited(ip)) return response(429, 'Слишком много попыток. Повторите отправку позже.')
        if (body.website) return response(200, 'Заявка отправлена.')
        if (body.consent !== true || body.consentVersion !== LEGAL_VERSION || body.privacyVersion !== LEGAL_VERSION) {
            return response(422, 'Необходимо подтвердить согласие на обработку персональных данных.')
        }

        const formType = body.formType === 'nir' ? 'Заявка на НИР' : body.formType === 'doklinicheskie' ? 'Заявка на доклинические исследования' : ''
        const source = body.data && typeof body.data === 'object' && !Array.isArray(body.data) ? body.data as Record<string, unknown> : null
        if (!formType || !source) return response(400, 'Некорректный формат заявки.')

        const data = Object.entries(source).slice(0, 100).map(([key, value]) => [cleanText(key, 150), typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : cleanText(value)] as const)
        const email = cleanText(source['Электронная почта'], 254)
        const person = cleanText(source['ФИО контактного лица'], 150)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!person || !emailPattern.test(email)) return response(422, 'Проверьте ФИО и электронную почту.')

        const smtpUser = process.env.SMTP_USER
        const smtpPass = process.env.SMTP_PASS
        if (!smtpUser || !smtpPass) {
            console.error('SMTP_USER or SMTP_PASS is not configured')
            return response(500, 'Отправка почты ещё не настроена.')
        }

        const requestId = randomUUID()
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.mail.ru',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: (Number(process.env.SMTP_PORT) || 465) === 465,
            auth: { user: smtpUser, pass: smtpPass },
        })
        await transporter.sendMail({
            from: `Сайт ДОМ ФАРМАЦИИ <${smtpUser}>`,
            to: process.env.MAIL_TO || smtpUser,
            replyTo: email,
            subject: `${formType} — ${person}`,
            text: [formType, `Идентификатор заявки: ${requestId}`, '', ...data.map(([key, value]) => `${key}: ${value || 'Не указано'}`)].join('\n'),
        })

        const logPath = process.env.CONSENT_LOG_PATH || path.join(process.cwd(), 'data', 'consent-audit.log')
        await mkdir(path.dirname(logPath), { recursive: true })
        await appendFile(logPath, `${JSON.stringify({ event: 'personal_data_consent', requestId, acceptedAt: new Date().toISOString(), consentVersion: body.consentVersion, privacyVersion: body.privacyVersion, formType: body.formType, ip, userAgent: req.headers.get('user-agent') || '', page: req.headers.get('referer') || '' })}\n`, { encoding: 'utf8', mode: 0o600 })
        return response(200, 'Заявка успешно отправлена.')
    } catch (error) {
        console.error('Form submission failed:', error instanceof Error ? error.message : error)
        return response(500, 'Не удалось отправить письмо. Попробуйте позже.')
    }
}
