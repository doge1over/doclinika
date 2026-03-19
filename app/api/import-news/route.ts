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

function parseDate(dateStr: string): number {
    const parts = dateStr.split('.')
    if (parts.length !== 3) return 0
    const [day, month, year] = parts.map(Number)
    return new Date(year, month - 1, day).getTime()
}

function sortByDate(news: NewsItem[]): NewsItem[] {
    return [...news].sort((a, b) => parseDate(b.date) - parseDate(a.date))
}

function cleanContent(content: string): string {
    return content.replace(/<!--more-->/gi, '')
}

function makeExcerpt(content: string): string {
    const moreSplit = content.split(/<!--more-->/i)
    const textBefore = moreSplit[0] || content
    const plain = textBefore.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    return plain.slice(0, 200) + (plain.length > 200 ? '...' : '')
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
        const newItems = body
            .filter(n => !existingIds.has(n.id))
            .map(n => ({
                ...n,
                content: cleanContent(n.content),
                excerpt: n.excerpt || makeExcerpt(n.content),
            }))
        const merged = sortByDate([...existing, ...newItems])

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