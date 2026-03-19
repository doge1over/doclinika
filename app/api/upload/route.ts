import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { validateToken } from '@/lib/auth'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

export async function POST(req: NextRequest) {
    const body = (await req.json()) as HandleUploadBody

    try {
        const jsonResponse = await handleUpload({
            body,
            request: req,
            onBeforeGenerateToken: async (_pathname, clientPayload) => {
                // JWT токен приходит через clientPayload от клиента
                if (!clientPayload || !validateToken(clientPayload)) {
                    throw new Error('Не авторизован')
                }

                return {
                    allowedContentTypes: ALLOWED_TYPES,
                    maximumSizeInBytes: MAX_FILE_SIZE,
                }
            },
            onUploadCompleted: async () => {
                // Загрузка завершена
            },
        })

        return NextResponse.json(jsonResponse)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Ошибка загрузки'
        return NextResponse.json({ error: message }, { status: 400 })
    }
}