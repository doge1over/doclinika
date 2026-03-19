import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

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

    // Проверка расширения
    const nameParts = file.name.split('.')
    const ext = nameParts.length > 1 ? `.${nameParts.pop()?.toLowerCase()}` : ''
    if (!ALLOWED_EXTS.includes(ext)) {
        return NextResponse.json({ error: `Недопустимое расширение: ${ext}` }, { status: 400 })
    }

    // Безопасное имя файла
    const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

    try {
        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: false,
        })

        return NextResponse.json({ success: true, url: blob.url })
    } catch (error) {
        console.error('Blob upload error:', error)
        return NextResponse.json({ error: 'Ошибка загрузки файла' }, { status: 500 })
    }
}