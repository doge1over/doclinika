import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

interface NewsItem {
    id: string
    date: string
    title: string
    excerpt: string
    content: string
}

export async function POST(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    if (!validateToken(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    try {
        const body: NewsItem[] = await req.json()

        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Ожидался массив новостей' }, { status: 400 })
        }

        const existing: NewsItem[] = await kv.get<NewsItem[]>('news') || []
        const existingIds = new Set(existing.map(n => n.id))
        const newItems = body.filter(n => !existingIds.has(n.id))
        const merged = [...existing, ...newItems]

        await kv.set('news', merged)

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