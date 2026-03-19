'use client'
import { useState, useRef } from 'react'

export default function ImportPage() {
    const [password, setPassword] = useState('')
    const [json, setJson] = useState('')
    const [token, setToken] = useState('')
    const [status, setStatus] = useState('')
    const [authed, setAuthed] = useState(false)
    const [progress, setProgress] = useState('')
    const [migrateImages, setMigrateImages] = useState(true)
    const abortRef = useRef(false)

    const login = async () => {
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })
        const data = await res.json()
        if (data.token) { setToken(data.token); setAuthed(true); setStatus('Авторизован') }
        else setStatus('Ошибка: ' + (data.error || 'неверный пароль'))
    }

    // Находит все URL картинок в HTML контенте
    const extractImageUrls = (html: string): string[] => {
        const regex = /src=["']([^"']+\.(jpe?g|png|gif|webp|svg)[^"']*)/gi
        const urls: string[] = []
        let match
        while ((match = regex.exec(html)) !== null) {
            urls.push(match[1])
        }
        return [...new Set(urls)]
    }

    // Перезаливает одну картинку через серверный прокси
    const reuploadImage = async (oldUrl: string): Promise<string | null> => {
        try {
            const res = await fetch('/api/import-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ url: oldUrl })
            })
            const data = await res.json()
            return data.success ? data.url : null
        } catch {
            return null
        }
    }

    const doImport = async () => {
        if (!json.trim()) { setStatus('Вставьте JSON'); return }
        abortRef.current = false
        setStatus('Загрузка...')

        let parsed: Array<Record<string, string>>
        try {
            parsed = JSON.parse(json)
            if (!Array.isArray(parsed)) { setStatus('JSON должен быть массивом []'); return }
        } catch (e) {
            setStatus('Ошибка парсинга JSON: ' + (e instanceof Error ? e.message : String(e)))
            return
        }

        // Перезаливка картинок
        if (migrateImages) {
            const imageMap = new Map<string, string>() // oldUrl -> newUrl
            // Собираем все уникальные картинки
            const allUrls: string[] = []
            for (const item of parsed) {
                if (item.content) {
                    const urls = extractImageUrls(item.content)
                    for (const u of urls) {
                        if (!allUrls.includes(u)) allUrls.push(u)
                    }
                }
            }

            if (allUrls.length > 0) {
                setProgress(`Найдено ${allUrls.length} картинок. Перезаливка...`)
                let done = 0
                let failed = 0
                for (const oldUrl of allUrls) {
                    if (abortRef.current) { setStatus('Отменено'); return }
                    setProgress(`Картинка ${done + 1}/${allUrls.length}: загрузка...`)
                    const newUrl = await reuploadImage(oldUrl)
                    if (newUrl) {
                        imageMap.set(oldUrl, newUrl)
                    } else {
                        failed++
                    }
                    done++
                    setProgress(`Картинки: ${done}/${allUrls.length} (ошибок: ${failed})`)
                }

                // Заменяем URL в контенте
                for (const item of parsed) {
                    if (item.content) {
                        let updated = item.content
                        for (const [oldUrl, newUrl] of imageMap) {
                            updated = updated.split(oldUrl).join(newUrl)
                        }
                        item.content = updated
                    }
                }
                setProgress(`Картинки загружены: ${done - failed}/${allUrls.length}`)
            }
        }

        // Загрузка новостей порциями
        const chunkSize = 3
        let total = 0
        for (let i = 0; i < parsed.length; i += chunkSize) {
            if (abortRef.current) { setStatus('Отменено'); return }
            const chunk = parsed.slice(i, i + chunkSize)
            setStatus(`Сохранение новостей ${i + 1}-${Math.min(i + chunkSize, parsed.length)} из ${parsed.length}...`)
            const res = await fetch('/api/import-news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(chunk)
            })
            const data = await res.json()
            if (!data.success) { setStatus('Ошибка: ' + (data.error || 'неизвестная')); return }
            total = data.total
        }
        setStatus(`Готово! Импортировано ${parsed.length} новостей. Всего в базе: ${total}`)
        setProgress('')
    }

    const clearAll = async () => {
        if (!confirm('Удалить ВСЕ новости из базы? Это нельзя отменить.')) return
        setStatus('Очистка...')
        const res = await fetch('/api/news')
        const current = await res.json()
        let deleted = 0
        for (const item of current) {
            await fetch('/api/news', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ id: item.id })
            })
            deleted++
            setStatus(`Удаление ${deleted}/${current.length}...`)
        }
        setStatus(`Удалено ${deleted} новостей. База пуста.`)
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Импорт новостей</h1>

            {!authed ? (
                <div>
                    <input type="password" placeholder="Пароль администратора" value={password}
                           onChange={e => setPassword(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && login()}
                           style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', width: '300px', marginRight: '10px' }} />
                    <button onClick={login} style={{ padding: '10px 20px', background: '#F28F20', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Войти</button>
                </div>
            ) : (
                <div>
                    <p style={{ marginBottom: '10px', color: '#6b7280', fontSize: '14px' }}>
                        Вставьте содержимое <code>data/news.json</code> целиком. Картинки со старого сервера будут перезалиты в Blob автоматически.
                    </p>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={migrateImages} onChange={e => setMigrateImages(e.target.checked)} />
                        Перезалить картинки со старого сервера в Vercel Blob
                    </label>

                    <textarea
                        value={json}
                        onChange={e => setJson(e.target.value)}
                        placeholder='Вставьте сюда весь JSON массив [ { "id": "...", ... }, ... ]'
                        rows={20}
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
                    />
                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button onClick={doImport} style={{ padding: '12px 24px', background: '#F28F20', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                            Импортировать
                        </button>
                        <button onClick={clearAll} style={{ padding: '12px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                            Очистить базу
                        </button>
                        <button onClick={() => { abortRef.current = true }} style={{ padding: '12px 24px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                            Отменить
                        </button>
                    </div>
                </div>
            )}

            {progress && <p style={{ marginTop: '12px', padding: '10px', background: '#EFF6FF', borderRadius: '8px', fontSize: '13px', color: '#1e40af' }}>{progress}</p>}
            {status && <p style={{ marginTop: '8px', padding: '12px', background: status.includes('Ошибка') || status.includes('Отменено') ? '#FEF2F2' : '#F0FDF4', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>{status}</p>}

            <p style={{ marginTop: '30px', color: '#9ca3af', fontSize: '12px' }}>После импорта удалите app/admin/import/, app/api/import-news/ и app/api/import-image/ из проекта.</p>
        </div>
    )
}