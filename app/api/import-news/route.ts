import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const NEWS_FILE = path.join(process.cwd(), 'data', 'news.json')

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-import-secret')
    if (secret !== process.env.SESSION_SECRET) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    try {
        const body = await req.json()

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Ожидался массив новостей' }, { status: 400 })
        }

        // Читаем существующие
        let existing: unknown[] = []
        try {
            const data = fs.readFileSync(NEWS_FILE, 'utf-8')
            existing = JSON.parse(data)
        } catch { /* файла нет — ок */ }

        const existingIds = new Set(existing.map((n: any) => String(n.id)))
        const seen = new Set(existingIds)
        const newItems: any[] = []
        for (const n of body as any[]) {
            const id = String(n.id)
            if (seen.has(id)) continue
            seen.add(id)
            newItems.push({ ...n, id })
        }
        const merged = [...existing, ...newItems]

        // Сохраняем
        const dir = path.dirname(NEWS_FILE)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(NEWS_FILE, JSON.stringify(merged, null, 2), 'utf-8')

        return NextResponse.json({
            success: true,
            imported: newItems.length,
            total: merged.length,
        })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Ошибка импорта' },
            { status: 500 }
        )
    }
}