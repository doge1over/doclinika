import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { validateSession, getTokenFromHeaders } from '@/lib/auth'

const NEWS_FILE = path.join(process.cwd(), 'data', 'news.json')

interface NewsItem {
    id: string
    date: string
    title: string
    excerpt: string
    content: string
}

function getNews(): NewsItem[] {
    try {
        const data = fs.readFileSync(NEWS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

function saveNews(news: NewsItem[]) {
    const dir = path.dirname(NEWS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8')
}

function requireAuth(req: NextRequest): NextResponse | null {
    const token = getTokenFromHeaders(req.headers)
    if (!validateSession(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }
    return null
}

// GET — публичный, без авторизации
export async function GET() {
    return NextResponse.json(getNews())
}

// POST — создание новости (требует авторизации)
export async function POST(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    const news = getNews()
    const dateStr = body.date || new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const newItem = {
        id: Date.now().toString(),
        date: dateStr,
        title: body.title,
        excerpt: body.excerpt || body.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
        content: body.content,
    }
    news.unshift(newItem)
    saveNews(news)
    return NextResponse.json({ success: true, item: newItem })
}

// PUT — редактирование новости (требует авторизации)
export async function PUT(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    if (!body.id) {
        return NextResponse.json({ error: 'ID не указан' }, { status: 400 })
    }
    const news = getNews()
    const index = news.findIndex(n => n.id === body.id)
    if (index === -1) {
        return NextResponse.json({ error: 'Новость не найдена' }, { status: 404 })
    }
    if (body.title !== undefined) news[index].title = body.title
    if (body.content !== undefined) {
        news[index].content = body.content
        news[index].excerpt = body.excerpt || body.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
    }
    if (body.date !== undefined) news[index].date = body.date
    saveNews(news)
    return NextResponse.json({ success: true, item: news[index] })
}

// DELETE — удаление новости (требует авторизации)
export async function DELETE(req: NextRequest) {
    const authError = requireAuth(req)
    if (authError) return authError

    const body = await req.json()
    const news = getNews()
    const filtered = news.filter(n => n.id !== body.id)
    saveNews(filtered)
    return NextResponse.json({ success: true })
}