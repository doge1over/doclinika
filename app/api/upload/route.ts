import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export async function POST(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    if (!validateToken(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
        return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: `Недопустимый тип файла: ${file.type}. Разрешены: JPG, PNG, GIF, WebP, SVG` },
            { status: 400 }
        )
    }

    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error: `Файл слишком большой (${(file.size / 1024 / 1024).toFixed(1)} МБ). Максимум: 10 МБ` },
            { status: 400 }
        )
    }

    const ext = path.extname(file.name).toLowerCase()
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    if (!allowedExts.includes(ext)) {
        return NextResponse.json({ error: `Недопустимое расширение файла: ${ext}` }, { status: 400 })
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    const bytes = await file.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(bytes))

    return NextResponse.json({ success: true, url: `/uploads/${filename}` })
}