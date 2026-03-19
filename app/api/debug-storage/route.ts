import { NextResponse } from 'next/server'

export async function GET() {
    const env = {
        // KV
        hasKvUrl: !!process.env.KV_REST_API_URL,
        hasKvToken: !!process.env.KV_REST_API_TOKEN,
        kvUrl: process.env.KV_REST_API_URL?.slice(0, 30) + '...' || 'NOT SET',

        // Blob
        hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,

        // Auth
        hasPassword: !!process.env.ADMIN_PASSWORD,
        hasSecret: !!process.env.SESSION_SECRET,

        // Все env ключи (без значений)
        allKeys: Object.keys(process.env).filter(k =>
            k.includes('KV') || k.includes('BLOB') || k.includes('REDIS') || k.includes('UPSTASH')
        ),
    }

    // Попробуем подключиться к KV
    let kvTest = 'not tested'
    try {
        const { kv } = await import('@vercel/kv')
        await kv.set('__test__', 'ok')
        const val = await kv.get('__test__')
        kvTest = val === 'ok' ? 'OK' : `unexpected: ${val}`
        await kv.del('__test__')
    } catch (err) {
        kvTest = `ERROR: ${err instanceof Error ? err.message : String(err)}`
    }

    // Попробуем Blob
    let blobTest = 'not tested'
    try {
        const { put, del } = await import('@vercel/blob')
        const blob = await put('__test__.txt', 'ok', { access: 'public', addRandomSuffix: false })
        blobTest = blob.url ? 'OK' : 'no url returned'
        await del(blob.url)
    } catch (err) {
        blobTest = `ERROR: ${err instanceof Error ? err.message : String(err)}`
    }

    return NextResponse.json({ env, kvTest, blobTest }, { status: 200 })
}
