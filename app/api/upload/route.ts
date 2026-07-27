import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    if (!validateToken(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
        }

        // Создаём папку если нет
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true })
        }

        // Генерируем уникальное имя
        const ext = path.extname(file.name) || '.jpg'
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
        const filePath = path.join(UPLOADS_DIR, safeName)

        // Сохраняем на диск
        const buffer = Buffer.from(await file.arrayBuffer())
        fs.writeFileSync(filePath, buffer)

        // Возвращаем URL
        const url = `/uploads/${safeName}`

        return NextResponse.json({ success: true, url })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Ошибка загрузки' },
            { status: 500 }
        )
    }
}