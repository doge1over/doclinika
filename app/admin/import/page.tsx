'use client'

import { useState } from 'react'

export default function ImportPage() {
    const [json, setJson] = useState('')
    const [secret, setSecret] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleImport() {
        if (!json.trim() || !secret.trim()) { setStatus('Заполните оба поля'); return }
        try { JSON.parse(json) } catch { setStatus('Невалидный JSON'); return }

        setLoading(true)
        setStatus('Импортирую...')
        try {
            const res = await fetch('/api/import-news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-import-secret': secret },
                body: json,
            })
            const data = await res.json()
            if (data.success) setStatus(`✅ Импортировано: ${data.imported} новостей. Всего: ${data.total}`)
            else setStatus(`❌ Ошибка: ${data.error}`)
        } catch (e) {
            setStatus(`❌ Сетевая ошибка: ${e instanceof Error ? e.message : 'unknown'}`)
        }
        setLoading(false)
    }

    return (
        <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Импорт новостей</h1>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>SESSION_SECRET:</label>
                <input type="password" value={secret} onChange={e => setSecret(e.target.value)}
                       placeholder="Введите SESSION_SECRET из .env" style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Содержимое data/news.json:</label>
                <textarea value={json} onChange={e => setJson(e.target.value)}
                          placeholder='[{"id":"...","date":"...","title":"...","excerpt":"...","content":"..."},...]'
                          style={{ width: '100%', height: 400, padding: '12px 14px', border: '1px solid #ddd', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <button onClick={handleImport} disabled={loading}
                    style={{ padding: '12px 32px', background: loading ? '#999' : '#F28F20', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
                {loading ? 'Импортирую...' : 'Импортировать'}
            </button>
            {status && <div style={{ marginTop: 16, padding: '12px 16px', background: '#f5f5f5', borderRadius: 8, fontSize: 14 }}>{status}</div>}
        </div>
    )
}