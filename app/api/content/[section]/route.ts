import { NextRequest, NextResponse } from 'next/server'
import { getSession, getTokenFromHeaders, hasPermission } from '@/lib/auth'
import { isSection, readSection, saveSection, type ContentItem } from '@/lib/content'
import { writeAudit } from '@/lib/audit'
import { createBackup, ensureDailyBackup } from '@/lib/backups'

export async function GET(_req: NextRequest, context: { params: Promise<{ section: string }> }) {
    const { section } = await context.params
    if (!isSection(section)) return NextResponse.json({ error: 'Раздел не найден' }, { status: 404 })
    return NextResponse.json(readSection(section), { headers: { 'Cache-Control': 'no-store' } })
}

export async function PUT(req: NextRequest, context: { params: Promise<{ section: string }> }) {
    const { section } = await context.params
    if (!isSection(section)) return NextResponse.json({ error: 'Раздел не найден' }, { status: 404 })
    const user = getSession(getTokenFromHeaders(req.headers))
    if (!user) return NextResponse.json({ error: 'Требуется авторизация' }, { status: 401 })
    if (!hasPermission(user, section)) return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 })
    const body = await req.json()
    if (!Array.isArray(body) || body.length > 1000) return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 })
    const items: ContentItem[] = body.map((raw: Record<string, unknown>) => {
        const item: ContentItem = { id: String(raw.id || crypto.randomUUID()) }
        for (const [key,value] of Object.entries(raw)) {
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) || key === 'id') continue
            if (typeof value === 'string') item[key] = value.slice(0, 20000)
            else if (typeof value === 'number' || typeof value === 'boolean' || Array.isArray(value)) item[key] = value
        }
        return item
    })
    ensureDailyBackup()
    createBackup('change', user.username)
    saveSection(section, items)
    writeAudit(user,'content_saved',section,req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||req.headers.get('x-real-ip')||'127.0.0.1',undefined,`${items.length} записей`)
    return NextResponse.json({ success: true, items })
}
