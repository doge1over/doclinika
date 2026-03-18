import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const ADMIN_PASSWORD = 'admin123'

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const password = formData.get('password') as string
    const file = formData.get('file') as File

    if (password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    if (!file) {
        return NextResponse.json({ error: 'Файл не выбран' }, { status: 400 })
    }

    // Create uploads dir if not exists
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }

    // Generate unique filename
    const ext = path.extname(file.name) || '.jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    // Write file
    const bytes = await file.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(bytes))

    const url = `/uploads/${filename}`
    return NextResponse.json({ success: true, url })
}
