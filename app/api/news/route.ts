import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

const NEWS_KEY = 'news'

interface NewsItem {
    id: string
    date: string
    title: string
    excerpt: string
    content: string
}

// Парсит дату dd.mm.yyyy в timestamp для сортировки
function parseDate(dateStr: string): number {
    const parts = dateStr.split('.')
    if (parts.length !== 3) return 0
    const [day, month, year] = parts.map(Number)
    return new Date(year, month - 1, day).getTime()
}

// Сортирует новости по дате (новые первые)
function sortByDate(news: NewsItem[]): NewsItem[] {
    return [...news].sort((a, b) => parseDate(b.date) - parseDate(a.date))
}

// Убирает <!--more--> и генерирует excerpt если нужно
function cleanContent(content: string): string {
    return content.replace(/<!--more-->/gi, '')
}

function makeExcerpt(content: string): string {
    // Берём текст до <!--more--> если есть
    const moreSplit = content.split(/<!--more-->/i)
    const textBefore = moreSplit[0] || content
    const plain = textBefore.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    return plain.slice(0, 200) + (plain.length > 200 ? '...' : '')
}

async function getNews(): Promise<NewsItem[]> {
    try {
        const data = await kv.get<NewsItem[]>(NEWS_KEY)
        return data || []
    } catch {
        return []
    }
}

async function saveNews(news: NewsItem[]): Promise<void> {
    await kv.set(NEWS_KEY, news)
}

function requireAuth(req: NextRequest): NextResponse | null {
    const token = getTokenFromHeaders(req.headers)
    if (!validateToken(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }
    return null
}

export async function GET() {
    const news = await getNews()
    return NextResponse.json(sortByDate(news))
}

export async function POST(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    const news = await getNews()
    const dateStr = body.date || new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const cleaned = cleanContent(body.content)
    const newItem: NewsItem = {
        id: Date.now().toString(),
        date: dateStr,
        title: body.title,
        excerpt: body.excerpt || makeExcerpt(body.content),
        content: cleaned,
    }
    news.unshift(newItem)
    await saveNews(sortByDate(news))
    return NextResponse.json({ success: true, item: newItem })
}

export async function PUT(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    if (!body.id) {
        return NextResponse.json({ error: 'ID не указан' }, { status: 400 })
    }
    const news = await getNews()
    const index = news.findIndex(n => n.id === body.id)
    if (index === -1) {
        return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 })
    }
    if (body.title !== undefined) news[index].title = body.title
    if (body.content !== undefined) {
        news[index].content = cleanContent(body.content)
        news[index].excerpt = body.excerpt || makeExcerpt(body.content)
    }
    if (body.date !== undefined) news[index].date = body.date
    await saveNews(sortByDate(news))
    return NextResponse.json({ success: true, item: news[index] })
}

export async function DELETE(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    const news = await getNews()
    const filtered = news.filter(n => n.id !== body.id)
    await saveNews(filtered)
    return NextResponse.json({ success: true })
}