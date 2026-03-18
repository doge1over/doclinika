import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const NEWS_FILE = path.join(process.cwd(), 'data', 'news.json')
const ADMIN_PASSWORD = 'admin123'

function getNews() {
    try {
        const data = fs.readFileSync(NEWS_FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}

function saveNews(news: any[]) {
    const dir = path.dirname(NEWS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8')
}

export async function GET() {
    const news = getNews()
    return NextResponse.json(news)
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const news = getNews()
    const newItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        title: body.title,
        excerpt: body.excerpt || body.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
        content: body.content,
        image: body.image || '',
    }

    news.unshift(newItem)
    saveNews(news)

    return NextResponse.json({ success: true, item: newItem })
}

export async function DELETE(req: NextRequest) {
    const body = await req.json()

    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    const news = getNews()
    const filtered = news.filter((n: any) => n.id !== body.id)
    saveNews(filtered)

    return NextResponse.json({ success: true })
}