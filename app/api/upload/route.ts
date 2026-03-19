import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { validateSession, getTokenFromHeaders } from '@/lib/auth'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 МБ
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export async function POST(req: NextRequest) {
    // Авторизация через токен в заголовке
    const token = getTokenFromHeaders(req.headers)
    if (!validateSession(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
        return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 })
    }

    // Проверка типа файла
    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: `Недопустимый тип файла: ${file.type}. Разрешены: JPG, PNG, GIF, WebP, SVG` },
            { status: 400 }
        )
    }

    // Проверка размера
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error: `Файл слишком большой (${(file.size / 1024 / 1024).toFixed(1)} МБ). Максимум: 10 МБ` },
            { status: 400 }
        )
    }

    // Проверка расширения (двойная проверка, не только MIME)
    const ext = path.extname(file.name).toLowerCase()
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    if (!allowedExts.includes(ext)) {
        return NextResponse.json(
            { error: `Недопустимое расширение файла: ${ext}` },
            { status: 400 }
        )
    }

    // Создание папки
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    // Безопасное имя файла (только латиница, цифры, дефис)
    const safeExt = ext
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`
    const filepath = path.join(UPLOAD_DIR, filename)

    // Запись
    const bytes = await file.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(bytes))

    const url = `/uploads/${filename}`
    return NextResponse.json({ success: true, url })
}