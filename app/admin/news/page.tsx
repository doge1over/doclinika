'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface N { id: string; date: string; title: string; excerpt: string; content: string; image?: string }

export default function NewsAdmin() {
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)
    const [news, setNews] = useState<N[]>([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const coverRef = useRef<HTMLInputElement>(null)

    const loadNews = () => { fetch('/api/news').then(r => r.json()).then(setNews).catch(() => {}) }
    useEffect(() => { if (auth) loadNews() }, [auth])

    const handleLogin = () => {
        if (password === 'admin123') { setAuth(true); setStatus('') }
        else setStatus('Неверный пароль')
    }

    const uploadFile = async (file: File): Promise<string | null> => {
        const form = new FormData()
        form.append('password', password)
        form.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        const data = await res.json()
        return data.success ? data.url : null
    }

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const url = await uploadFile(file)
        if (url) setCoverImage(url)
        else setStatus('Ошибка загрузки')
        setUploading(false)
    }

    const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const url = await uploadFile(file)
        if (url) {
            const textarea = contentRef.current
            if (textarea) {
                const pos = textarea.selectionStart || content.length
                const imgTag = `<img src="${url}" alt="" style="max-width:100%;border-radius:8px;margin:12px 0" />`
                const newContent = content.slice(0, pos) + imgTag + content.slice(pos)
                setContent(newContent)
            }
        } else setStatus('Ошибка загрузки')
        setUploading(false)
        if (fileRef.current) fileRef.current.value = ''
    }

    const handleAdd = async () => {
        if (!title.trim() || !content.trim()) { setStatus('Заполните заголовок и содержание'); return }
        setLoading(true)
        const body: any = { password, title, content }
        if (coverImage) body.image = coverImage
        const res = await fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        const data = await res.json()
        if (data.success) { setTitle(''); setContent(''); setCoverImage(''); setStatus('Новость добавлена!'); loadNews() }
        else setStatus(data.error || 'Ошибка')
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Удалить эту новость?')) return
        const res = await fetch('/api/news', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, id }) })
        const data = await res.json()
        if (data.success) { setStatus('Удалено'); loadNews() }
        else setStatus(data.error || 'Ошибка')
    }

    // Styles
    const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }
    const btnPrimary: React.CSSProperties = { padding: '12px 24px', background: '#F28F20', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }

    if (!auth) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '400px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '24px', textAlign: 'center' }}>Панель управления новостями</h1>
                    <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ ...inputStyle, marginBottom: '12px' }} />
                    <button onClick={handleLogin} style={{ ...btnPrimary, width: '100%' }}>Войти</button>
                    {status && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>{status}</p>}
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
            {/* Header */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Link href="/" style={{ fontSize: '16px', fontWeight: 700, color: '#F28F20', textDecoration: 'none' }}>← На сайт</Link>
                    <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>Управление новостями</h1>
                </div>
                <button onClick={() => { setAuth(false); setPassword('') }} style={{ fontSize: '13px', color: '#6b7280', background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 16px', cursor: 'pointer' }}>Выйти</button>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
                {/* Add form */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Добавить новость</h2>

                    <input type="text" placeholder="Заголовок новости" value={title} onChange={e => setTitle(e.target.value)} style={{ ...inputStyle, marginBottom: '12px' }} />

                    {/* Cover image */}
                    <div style={{ marginBottom: '12px' }}>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px', fontWeight: 500 }}>Обложка новости (необязательно):</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input type="file" accept="image/*" ref={coverRef} onChange={handleCoverUpload} style={{ fontSize: '13px' }} />
                            {uploading && <span style={{ fontSize: '12px', color: '#F28F20' }}>Загрузка...</span>}
                        </div>
                        {coverImage && (
                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img src={coverImage} alt="cover" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                                <button onClick={() => setCoverImage('')} style={{ fontSize: '12px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>Удалить обложку</button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, margin: 0 }}>Содержание (поддерживает HTML):</p>
                            <label style={{ fontSize: '12px', color: '#F28F20', cursor: 'pointer', fontWeight: 600 }}>
                                📷 Вставить фото в текст
                                <input type="file" accept="image/*" ref={fileRef} onChange={handleInsertImage} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <textarea ref={contentRef} placeholder="Текст новости..." value={content} onChange={e => setContent(e.target.value)} rows={10}
                                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button onClick={handleAdd} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                            {loading ? 'Добавление...' : 'Опубликовать'}
                        </button>
                        {status && <span style={{ fontSize: '13px', color: status.includes('добавлена') || status.includes('Удалено') ? '#16a34a' : '#ef4444' }}>{status}</span>}
                    </div>

                    {/* Preview */}
                    {content && (
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }}>Предпросмотр:</p>
                            <div style={{ background: '#fafafa', borderRadius: '8px', padding: '16px', border: '1px solid #f3f4f6' }}>
                                {coverImage && <img src={coverImage} alt="" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />}
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>{title || 'Без заголовка'}</h3>
                                <div style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* News list */}
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Опубликованные новости ({news.length})</h2>
                    {news.length === 0 ? <p style={{ color: '#9ca3af', fontSize: '14px' }}>Новостей пока нет</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {news.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                                        {item.image && <img src={item.image} alt="" style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />}
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</p>
                                            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{item.date}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(item.id)} style={{ flexShrink: 0, padding: '6px 12px', background: 'none', border: '1px solid #fca5a5', borderRadius: '6px', color: '#ef4444', fontSize: '12px', cursor: 'pointer' }}>Удалить</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}