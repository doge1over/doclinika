import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getSession, getTokenFromHeaders, hasPermission, type Permission } from '@/lib/auth'
import { writeAudit } from '@/lib/audit'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(req: NextRequest) {
    const user = getSession(getTokenFromHeaders(req.headers))
    if (!user) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const file = formData.get('file') as File | null
        const permission = String(formData.get('permission') || 'news') as Permission

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
        }
        if (!hasPermission(user, permission)) return NextResponse.json({ error: 'Недостаточно прав' }, { status: 403 })
        if (file.size > 15 * 1024 * 1024) return NextResponse.json({ error: 'Файл больше 15 МБ' }, { status: 413 })

        const allowed = new Set(['image/jpeg','image/png','image/webp','image/gif','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
        if (!allowed.has(file.type)) return NextResponse.json({ error: 'Недопустимый тип файла' }, { status: 415 })

        // Создаём папку если нет
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true })
        }

        // Генерируем уникальное имя
        const extensionByType: Record<string,string> = { 'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp','image/gif':'.gif','application/pdf':'.pdf','application/msword':'.doc','application/vnd.openxmlformats-officedocument.wordprocessingml.document':'.docx' }
        const ext = extensionByType[file.type]
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
        const filePath = path.join(UPLOADS_DIR, safeName)

        // Сохраняем на диск
        const buffer = Buffer.from(await file.arrayBuffer())
        fs.writeFileSync(filePath, buffer)

        // Возвращаем URL
        const url = `/uploads/${safeName}`
        writeAudit(user,'file_uploaded',permission,req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'127.0.0.1',url,`${file.name}; ${file.size} bytes`)

        return NextResponse.json({ success: true, url })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Ошибка загрузки' },
            { status: 500 }
        )
    }
}
