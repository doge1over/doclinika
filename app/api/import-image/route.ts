import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { validateToken, getTokenFromHeaders } from '@/lib/auth'

// POST /api/import-image — скачивает картинку по URL и загружает в Blob
export async function POST(req: NextRequest) {
    const token = getTokenFromHeaders(req.headers)
    if (!validateToken(token)) {
        return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
        return NextResponse.json({ error: 'URL не указан' }, { status: 400 })
    }

    try {
        // Скачиваем картинку
        const response = await fetch(url, { signal: AbortSignal.timeout(8000) })
        if (!response.ok) {
            return NextResponse.json({ error: `Не удалось скачать: ${response.status}` }, { status: 400 })
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg'
        const buffer = await response.arrayBuffer()

        // Определяем расширение
        let ext = '.jpg'
        if (contentType.includes('png')) ext = '.png'
        else if (contentType.includes('gif')) ext = '.gif'
        else if (contentType.includes('webp')) ext = '.webp'
        else if (contentType.includes('svg')) ext = '.svg'
        else if (url.match(/\.(jpe?g|png|gif|webp|svg)/i)) {
            const match = url.match(/\.(jpe?g|png|gif|webp|svg)/i)
            if (match) ext = '.' + match[1].toLowerCase()
        }

        const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`

        const blob = await put(filename, Buffer.from(buffer), {
            access: 'public',
            contentType,
            addRandomSuffix: false,
        })

        return NextResponse.json({ success: true, url: blob.url })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Ошибка загрузки' },
            { status: 500 }
        )
    }
}