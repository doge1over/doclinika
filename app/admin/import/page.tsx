'use client'
import { useState } from 'react'

export default function ImportPage() {
    const [password, setPassword] = useState('')
    const [json, setJson] = useState('')
    const [token, setToken] = useState('')
    const [status, setStatus] = useState('')
    const [authed, setAuthed] = useState(false)

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

    const doImport = async () => {
        if (!json.trim()) { setStatus('Вставьте JSON'); return }
        setStatus('Загрузка...')
        try {
            const parsed = JSON.parse(json)
            if (!Array.isArray(parsed)) { setStatus('JSON должен быть массивом []'); return }

            // Разбиваем на порции по 5 штук чтобы не превысить лимиты
            const chunkSize = 5
            let total = 0
            for (let i = 0; i < parsed.length; i += chunkSize) {
                const chunk = parsed.slice(i, i + chunkSize)
                setStatus(`Загрузка ${i + 1}-${Math.min(i + chunkSize, parsed.length)} из ${parsed.length}...`)
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
        } catch (e) {
            setStatus('Ошибка парсинга JSON: ' + (e instanceof Error ? e.message : String(e)))
        }
    }

    const clearAll = async () => {
        if (!confirm('Удалить ВСЕ новости из базы? Это нельзя отменить.')) return
        setStatus('Очистка...')
        const res = await fetch('/api/import-news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify([])
        })
        // Записываем пустой массив напрямую
        const res2 = await fetch('/api/news')
        const current = await res2.json()
        // Удаляем по одному
        for (const item of current) {
            await fetch('/api/news', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ id: item.id })
            })
        }
        setStatus('База очищена. Можно импортировать заново.')
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
                        Вставьте содержимое файла <code>data/news.json</code> целиком в поле ниже и нажмите «Импортировать».
                        Все тексты и ссылки на картинки сохранятся как есть.
                    </p>
                    <textarea
                        value={json}
                        onChange={e => setJson(e.target.value)}
                        placeholder='Вставьте сюда весь JSON массив [ { "id": "...", ... }, ... ]'
                        rows={20}
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
                    />
                    <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                        <button onClick={doImport} style={{ padding: '12px 24px', background: '#F28F20', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }}>
                            Импортировать
                        </button>
                        <button onClick={clearAll} style={{ padding: '12px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '15px' }}>
                            Очистить базу
                        </button>
                    </div>
                </div>
            )}

            {status && <p style={{ marginTop: '16px', padding: '12px', background: status.includes('Ошибка') ? '#FEF2F2' : '#F0FDF4', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}>{status}</p>}

            <p style={{ marginTop: '30px', color: '#9ca3af', fontSize: '12px' }}>После импорта удалите эту страницу из проекта.</p>
        </div>
    )
}
