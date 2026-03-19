'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface N { id: string; date: string; title: string; excerpt: string; content: string }

function groupConsecutiveImages(html: string): string {
    return html.replace(
        /(<img\b[^>]*\/?>)(\s*(?:<br\s*\/?>)?\s*<img\b[^>]*\/?>)+/gi,
        (match) => `<div class="news-img-row">${match}</div>`
    )
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
    return (
        <div style={{
            position: 'fixed', top: '24px', right: '24px', zIndex: 10000,
            padding: '14px 20px', borderRadius: '12px',
            background: type === 'success' ? '#065f46' : '#991b1b',
            color: 'white', fontSize: '14px', fontWeight: 500,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'toastIn 0.3s ease-out', maxWidth: '400px'
        }}>
            {message}
            <button onClick={onClose} style={{ marginLeft: '8px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>×</button>
        </div>
    )
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', h)
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h) }
    }, [onClose])
    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', animation: 'fadeIn 0.2s ease-out'
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                position: 'relative', maxWidth: '720px', maxHeight: '75vh', width: 'auto',
                margin: '0 24px', cursor: 'default', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)', background: '#fff', padding: '8px',
                animation: 'scaleIn 0.25s ease-out'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.5)', border: 'none',
                    color: 'white', fontSize: '20px', width: '36px', height: '36px',
                    borderRadius: '10px', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1, lineHeight: 1,
                }}>×</button>
                <img src={src} alt="" style={{
                    display: 'block', maxWidth: '100%', maxHeight: 'calc(75vh - 16px)',
                    width: 'auto', height: 'auto', borderRadius: '12px', objectFit: 'contain',
                }} />
            </div>
        </div>
    )
}

function ImageSizeDialog({ imageUrl, onInsert, onClose }: { imageUrl: string; onInsert: (widthPx: number | null) => void; onClose: () => void }) {
    const [widthPx, setWidthPx] = useState(350)
    const [fullWidth, setFullWidth] = useState(false)
    const presets = [
        { label: 'S', px: 150 },
        { label: 'M', px: 300 },
        { label: 'L', px: 450 },
    ]
    return (
        <div className="adm-overlay" onClick={onClose}>
            <div className="adm-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', textAlign: 'left' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>Размер изображения</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>Настройте ширину. Фото одинакового размера встанут в ряд автоматически.</p>
                <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Превью — {fullWidth ? '100%' : `${widthPx}px`}
                    </p>
                    <img src={imageUrl} alt="preview" style={{
                        width: fullWidth ? '100%' : `${widthPx}px`, maxWidth: '100%',
                        height: 'auto', borderRadius: '8px', display: 'block', transition: 'width 0.15s ease'
                    }} />
                </div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    {presets.map(p => (
                        <button key={p.px} onClick={() => { setWidthPx(p.px); setFullWidth(false) }}
                                className="adm-size-btn" style={!fullWidth && widthPx === p.px ? { borderColor: '#F28F20', background: '#FFF7ED' } : {}}>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.label}</span>
                            <span style={{ fontSize: '10px', color: '#9ca3af' }}>{p.px}px</span>
                        </button>
                    ))}
                    <button onClick={() => setFullWidth(true)} className="adm-size-btn"
                            style={fullWidth ? { borderColor: '#F28F20', background: '#FFF7ED' } : {}}>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>100%</span>
                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>вся ширина</span>
                    </button>
                </div>
                {!fullWidth && (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#9ca3af', width: '36px', textAlign: 'right' }}>50</span>
                            <input type="range" min="50" max="800" value={widthPx}
                                   onChange={e => setWidthPx(Number(e.target.value))}
                                   style={{ flex: 1, accentColor: '#F28F20' }} />
                            <span style={{ fontSize: '12px', color: '#9ca3af', width: '36px' }}>800</span>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '4px' }}>
                            <input type="number" value={widthPx} min={50} max={1200}
                                   onChange={e => { const v = Number(e.target.value); if (v >= 50) setWidthPx(v) }}
                                   className="adm-input" style={{ width: '90px', textAlign: 'center', padding: '6px 8px', fontSize: '13px', display: 'inline-block' }} />
                            <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '4px' }}>px</span>
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="adm-btn-secondary" style={{ padding: '10px 20px' }}>Отмена</button>
                    <button onClick={() => onInsert(fullWidth ? null : widthPx)} className="adm-btn-primary" style={{ padding: '10px 20px' }}>Вставить</button>
                </div>
            </div>
        </div>
    )
}

export default function NewsAdmin() {
    const [password, setPassword] = useState('')
    const [token, setToken] = useState<string | null>(null)
    const [auth, setAuth] = useState(false)
    const [news, setNews] = useState<N[]>([])
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [showPreview, setShowPreview] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
    const [loginError, setLoginError] = useState<string | null>(null)
    const [loginLoading, setLoginLoading] = useState(false)
    const [lockoutSeconds, setLockoutSeconds] = useState(0)
    const [newsLoading, setNewsLoading] = useState(false)
    const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLDivElement>(null)
    const cursorPosRef = useRef<number>(0)

    const showToast = useCallback((message: string, type: 'success' | 'error') => { setToast({ message, type }) }, [])
    const loadNews = useCallback(() => {
        setNewsLoading(true)
        fetch('/api/news').then(r => r.json()).then(d => { setNews(d); setNewsLoading(false) }).catch(() => setNewsLoading(false))
    }, [])
    useEffect(() => { if (auth) loadNews() }, [auth, loadNews])

    // Таймер блокировки
    const lockoutTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const startLockout = useCallback((seconds: number) => {
        if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current)
        setLockoutSeconds(seconds)
        lockoutTimerRef.current = setInterval(() => {
            setLockoutSeconds(prev => {
                if (prev <= 1) {
                    if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current)
                    lockoutTimerRef.current = null
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }, [])
    useEffect(() => { return () => { if (lockoutTimerRef.current) clearInterval(lockoutTimerRef.current) } }, [])

    // Авторизованный fetch с автоматической обработкой 401
    const authFetch = useCallback(async (url: string, opts: RequestInit = {}): Promise<Response> => {
        const headers = new Headers(opts.headers)
        if (token) headers.set('Authorization', `Bearer ${token}`)
        const res = await fetch(url, { ...opts, headers })
        if (res.status === 401) {
            setAuth(false); setToken(null)
            showToast('Сессия истекла, войдите заново', 'error')
        }
        return res
    }, [token, showToast])

    const handleLogin = async () => {
        if (!password.trim() || loginLoading || lockoutSeconds > 0) return
        setLoginLoading(true); setLoginError(null)
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            const data = await res.json()
            if (res.ok && data.token) {
                setToken(data.token); setAuth(true); setLoginError(null)
            } else if (res.status === 429) {
                startLockout(data.retryAfterSeconds || 60)
                setLoginError('Слишком много попыток')
            } else {
                setLoginError(data.attemptsLeft !== undefined
                    ? `Неверный пароль (осталось ${data.attemptsLeft} попыток)`
                    : 'Неверный пароль')
            }
        } catch { setLoginError('Ошибка сети') }
        setLoginLoading(false)
    }

    const handleLogout = () => {
        setAuth(false); setToken(null); setPassword(''); resetForm()
    }

    const uploadFile = async (file: File): Promise<string | null> => {
        try {
            const { upload } = await import('@vercel/blob/client')
            const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
            const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
            const blob = await upload(filename, file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
                clientPayload: token || '',
            })
            return blob.url
        } catch {
            return null
        }
    }

    const handleInsertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; if (!file) return; setUploading(true)
        cursorPosRef.current = contentRef.current?.selectionStart || content.length
        const url = await uploadFile(file)
        if (url) { setPendingImageUrl(url) } else showToast('Ошибка загрузки', 'error')
        setUploading(false); if (fileRef.current) fileRef.current.value = ''
    }

    const insertImageAtCursor = (widthPx: number | null) => {
        if (!pendingImageUrl) return
        const pos = cursorPosRef.current
        let styleAttr: string
        if (widthPx === null) {
            styleAttr = 'max-width:100%;width:100%;height:auto;border-radius:8px;margin:6px 0;cursor:pointer'
        } else {
            styleAttr = `max-width:${widthPx}px;width:${widthPx}px;height:auto;border-radius:8px;margin:6px 4px 6px 0;cursor:pointer`
        }
        const imgTag = `<img src="${pendingImageUrl}" alt="" style="${styleAttr}" />`
        setContent(content.slice(0, pos) + imgTag + content.slice(pos))
        setPendingImageUrl(null)
    }

    const ruDateToISO = (r: string) => { const p = r.split('.'); return p.length === 3 ? `${p[2]}-${p[1]}-${p[0]}` : '' }
    const isoToRuDate = (i: string) => { const p = i.split('-'); return p.length === 3 ? `${p[2]}.${p[1]}.${p[0]}` : '' }
    const getTodayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }

    const resetForm = () => { setTitle(''); setContent(''); setDate(''); setEditingId(null); setShowPreview(false) }

    const startEdit = (item: N) => {
        setEditingId(item.id); setTitle(item.title); setContent(item.content)
        setDate(ruDateToISO(item.date)); setShowPreview(false)
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Конвертация переносов строк в HTML если текст не содержит HTML-тегов
    const formatContent = (text: string): string => {
        const hasHtmlBlocks = /<(p|div|br|ul|ol|li|h[1-6]|table|blockquote)\b/i.test(text)
        if (hasHtmlBlocks) return text
        // Простой текст — оборачиваем абзацы
        return text
            .split(/\n\s*\n/) // двойной перенос = новый абзац
            .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
            .join('\n')
    }

    const handleSubmit = async () => {
        if (!title.trim()) { showToast('Введите заголовок новости', 'error'); return }
        if (!content.trim()) { showToast('Введите содержание новости', 'error'); return }
        setLoading(true); const dateValue = date ? isoToRuDate(date) : undefined
        const formattedContent = formatContent(content)
        try {
            if (editingId) {
                const body: { id: string; title: string; content: string; date?: string } = { id: editingId, title, content: formattedContent }
                if (dateValue) body.date = dateValue
                const res = await authFetch('/api/news', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                const data = await res.json()
                if (data.success) { resetForm(); showToast('Новость успешно обновлена', 'success'); loadNews() }
                else showToast(data.error || 'Ошибка сохранения', 'error')
            } else {
                const body: { title: string; content: string; date?: string } = { title, content: formattedContent }
                if (dateValue) body.date = dateValue
                const res = await authFetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                const data = await res.json()
                if (data.success) { resetForm(); showToast('Новость опубликована', 'success'); loadNews() }
                else showToast(data.error || 'Ошибка публикации', 'error')
            }
        } catch { showToast('Ошибка сети', 'error') }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await authFetch('/api/news', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
            const data = await res.json()
            if (data.success) { showToast('Новость удалена', 'success'); if (editingId === id) resetForm(); loadNews() }
            else showToast(data.error || 'Ошибка', 'error')
        } catch { showToast('Ошибка сети', 'error') }
        setConfirmDelete(null)
    }

    const filteredNews = searchQuery ? news.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.date.includes(searchQuery)) : news
    const fmtDate = (d: string) => { const p = d.split('.'); if (p.length !== 3) return d; const m = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']; return `${parseInt(p[0])} ${m[parseInt(p[1])-1]||p[1]} ${p[2]}` }

    if (!auth) {
        return (<>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="adm-login">
                <div className="adm-login-card" style={loginError ? { animation: 'shake 0.4s ease-in-out' } : {}}>
                    <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Панель новостей</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 28px' }}>Введите пароль для доступа</p>
                    <input type="password" placeholder="Пароль" value={password}
                           onChange={e => { setPassword(e.target.value); setLoginError(null) }}
                           onKeyDown={e => e.key === 'Enter' && handleLogin()}
                           className={`adm-input ${loginError ? 'adm-input-err' : ''}`}
                           disabled={lockoutSeconds > 0 || loginLoading}
                           autoFocus />
                    {loginError && <p style={{ color: '#dc2626', fontSize: '13px', margin: '8px 0 0', fontWeight: 500 }}>{loginError}</p>}
                    {lockoutSeconds > 0 && <p style={{ color: '#F28F20', fontSize: '13px', margin: '8px 0 0', fontWeight: 500 }}>Повторная попытка через {lockoutSeconds} сек.</p>}
                    <button onClick={handleLogin} className="adm-btn-primary"
                            style={{ width: '100%', marginTop: '8px', opacity: (lockoutSeconds > 0 || loginLoading) ? 0.6 : 1 }}
                            disabled={lockoutSeconds > 0 || loginLoading}>
                        {loginLoading ? 'Вход...' : lockoutSeconds > 0 ? `Заблокировано (${lockoutSeconds})` : 'Войти'}
                    </button>
                </div>
            </div>
        </>)
    }

    return (<>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
        {pendingImageUrl && <ImageSizeDialog imageUrl={pendingImageUrl} onInsert={insertImageAtCursor} onClose={() => setPendingImageUrl(null)} />}

        {confirmDelete && (
            <div className="adm-overlay" onClick={() => setConfirmDelete(null)}>
                <div className="adm-modal" onClick={e => e.stopPropagation()}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px' }}>Удалить новость?</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.5 }}>Это действие нельзя отменить.</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button onClick={() => setConfirmDelete(null)} className="adm-btn-secondary">Отмена</button>
                        <button onClick={() => handleDelete(confirmDelete)} className="adm-btn-danger">Удалить</button>
                    </div>
                </div>
            </div>
        )}

        <div className="adm-layout">
            <header className="adm-header">
                <div className="adm-header-inner">
                    <div className="adm-header-left">
                        <Link href="/" className="adm-back">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                            На сайт
                        </Link>
                        <div className="adm-divider" />
                        <h1 className="adm-title">Управление новостями</h1>
                    </div>
                    <div className="adm-header-right">
                        <span className="adm-count">{news.length} {news.length === 1 ? 'новость' : news.length < 5 ? 'новости' : 'новостей'}</span>
                        <button onClick={handleLogout} className="adm-logout">Выйти</button>
                    </div>
                </div>
            </header>

            <div className="adm-body">
                <div ref={formRef} className={`adm-card ${editingId ? 'adm-card-edit' : ''}`}>
                    <div className="adm-card-head">
                        <div>
                            <h2 className="adm-card-title">{editingId ? 'Редактирование' : 'Новая публикация'}</h2>
                            <p className="adm-card-sub">{editingId ? 'Внесите изменения и сохраните' : 'Заполните поля для публикации'}</p>
                        </div>
                        {editingId && <button onClick={resetForm} className="adm-btn-ghost">Отменить</button>}
                    </div>
                    <div className="adm-card-body">
                        <div className="adm-row">
                            <div className="adm-field" style={{ flex: 1 }}>
                                <label className="adm-label">Заголовок <span style={{ color: '#ef4444' }}>*</span></label>
                                <input type="text" placeholder="Введите заголовок новости..." value={title} onChange={e => setTitle(e.target.value)} className="adm-input adm-input-lg" />
                            </div>
                            <div className="adm-field adm-field-date">
                                <label className="adm-label">Дата</label>
                                <input type="date" value={date || getTodayISO()} onChange={e => setDate(e.target.value)} className="adm-input" />
                            </div>
                        </div>

                        <div className="adm-field">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <label className="adm-label" style={{ margin: 0 }}>Содержание <span style={{ color: '#ef4444' }}>*</span></label>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    {uploading && <span style={{ fontSize: '12px', color: '#F28F20', fontWeight: 500 }}>Загрузка...</span>}
                                    <label className="adm-insert-img">
                                        Вставить фото
                                        <input type="file" accept="image/*" ref={fileRef} onChange={handleInsertImage} hidden />
                                    </label>
                                </div>
                            </div>
                            <textarea ref={contentRef} placeholder="Текст новости (поддерживается HTML)..." value={content} onChange={e => setContent(e.target.value)} rows={12} className="adm-textarea" />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{content.length} символов</span>
                                {content && <button onClick={() => setShowPreview(!showPreview)} className="adm-preview-btn">{showPreview ? 'Скрыть предпросмотр' : 'Предпросмотр'}</button>}
                            </div>
                        </div>

                        {showPreview && content && (
                            <div className="adm-preview">
                                <div className="adm-preview-tag">Предпросмотр</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>{title || 'Без заголовка'}</h3>
                                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>{date ? isoToRuDate(date) : new Date().toLocaleDateString('ru-RU')}</p>
                                <div className="adm-preview-content" dangerouslySetInnerHTML={{ __html: groupConsecutiveImages(content) }} />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingTop: '4px' }}>
                            <button onClick={handleSubmit} disabled={loading} className="adm-btn-primary" style={loading ? { opacity: 0.7, cursor: 'wait' } : {}}>
                                {loading ? (<><div className="adm-spin-sm" /> {editingId ? 'Сохранение...' : 'Публикация...'}</>) : (editingId ? 'Сохранить изменения' : 'Опубликовать')}
                            </button>
                            {editingId && <button onClick={resetForm} className="adm-btn-secondary">Отмена</button>}
                        </div>
                    </div>
                </div>

                <div className="adm-card">
                    <div className="adm-card-head">
                        <div>
                            <h2 className="adm-card-title">Опубликованные новости</h2>
                            <p className="adm-card-sub">{news.length} {news.length === 1 ? 'публикация' : news.length < 5 ? 'публикации' : 'публикаций'}</p>
                        </div>
                        <button onClick={loadNews} className="adm-btn-ghost" title="Обновить">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6"/><path d="M21.34 15.57a10 10 0 11-.57-8.38"/></svg>
                        </button>
                    </div>
                    {news.length > 3 && (
                        <div className="adm-search-wrap">
                            <svg className="adm-search-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            <input type="text" placeholder="Поиск по заголовку или дате..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="adm-search" />
                            {searchQuery && <button onClick={() => setSearchQuery('')} className="adm-search-x">×</button>}
                        </div>
                    )}
                    <div className="adm-list">
                        {newsLoading ? (
                            <div className="adm-empty"><div className="adm-spin" /><span>Загрузка...</span></div>
                        ) : filteredNews.length === 0 ? (
                            <div className="adm-empty">
                                <p style={{ margin: 0 }}>{searchQuery ? 'Ничего не найдено' : 'Новостей пока нет'}</p>
                                {searchQuery && <button onClick={() => setSearchQuery('')} className="adm-btn-ghost" style={{ fontSize: '13px' }}>Сбросить поиск</button>}
                            </div>
                        ) : filteredNews.map(item => (
                            <div key={item.id} className={`adm-item ${editingId === item.id ? 'adm-item-edit' : ''}`}>
                                <div className="adm-item-info">
                                    <p className="adm-item-title">{item.title}</p>
                                    <div className="adm-item-meta">
                                        <span className="adm-item-date">{fmtDate(item.date)}</span>
                                        {editingId === item.id && <span className="adm-badge">Редактируется</span>}
                                    </div>
                                </div>
                                <div className="adm-item-acts">
                                    <button onClick={() => startEdit(item)} className="adm-act adm-act-edit" title="Редактировать">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    </button>
                                    <button onClick={() => setConfirmDelete(item.id)} className="adm-act adm-act-del" title="Удалить">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const CSS = `
@keyframes toastIn{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
@keyframes spin{to{transform:rotate(360deg)}}
*{box-sizing:border-box}
.adm-layout{min-height:100vh;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827}
.adm-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:20px}
.adm-login-card{background:#fff;border-radius:20px;padding:48px 40px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3);text-align:center}
.adm-header{background:#fff;border-bottom:1px solid #e5e7eb;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.adm-header-inner{max-width:960px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between}
.adm-header-left{display:flex;align-items:center;gap:16px}
.adm-header-right{display:flex;align-items:center;gap:16px}
.adm-back{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:#F28F20;text-decoration:none;transition:opacity .2s}
.adm-back:hover{opacity:.8}
.adm-divider{width:1px;height:24px;background:#e5e7eb}
.adm-title{font-size:16px;font-weight:700;color:#111827;margin:0}
.adm-count{font-size:13px;color:#6b7280;font-weight:500}
.adm-logout{display:flex;align-items:center;gap:6px;font-size:13px;color:#6b7280;background:none;border:1px solid #e5e7eb;border-radius:8px;padding:7px 14px;cursor:pointer;font-weight:500;transition:all .2s;font-family:inherit}
.adm-logout:hover{background:#f9fafb;border-color:#d1d5db;color:#374151}
.adm-body{max-width:960px;margin:0 auto;padding:28px 24px;display:flex;flex-direction:column;gap:24px}
.adm-card{background:#fff;border-radius:16px;border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,.04);overflow:hidden}
.adm-card-edit{border-color:#F28F20;box-shadow:0 0 0 3px rgba(242,143,32,.1)}
.adm-card-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:flex-start;justify-content:space-between}
.adm-card-title{font-size:16px;font-weight:700;color:#111827;margin:0 0 2px}
.adm-card-sub{font-size:13px;color:#9ca3af;margin:0}
.adm-card-body{padding:24px;display:flex;flex-direction:column;gap:20px}
.adm-row{display:flex;gap:16px;align-items:flex-end}
.adm-field{display:flex;flex-direction:column;gap:6px}
.adm-field-date{width:200px;flex-shrink:0}
.adm-label{font-size:13px;font-weight:600;color:#374151}
.adm-input{padding:10px 14px;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;outline:none;width:100%;transition:border-color .2s,box-shadow .2s;background:#fff;color:#111827}
.adm-input:focus{border-color:#F28F20;box-shadow:0 0 0 3px rgba(242,143,32,.1)}
.adm-input-lg{font-size:16px;font-weight:600;padding:12px 14px}
.adm-input-err{border-color:#ef4444!important;box-shadow:0 0 0 3px rgba(239,68,68,.1)!important}
.adm-textarea{padding:12px 14px;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:'Menlo','Consolas',monospace;outline:none;width:100%;resize:vertical;min-height:200px;line-height:1.6;transition:border-color .2s,box-shadow .2s;background:#fafafa;color:#111827}
.adm-textarea:focus{border-color:#F28F20;box-shadow:0 0 0 3px rgba(242,143,32,.1);background:#fff}
.adm-insert-img{display:flex;align-items:center;gap:5px;font-size:13px;color:#F28F20;cursor:pointer;font-weight:600;transition:opacity .2s}
.adm-insert-img:hover{opacity:.8}
.adm-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 28px;background:#F28F20;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.adm-btn-primary:hover{background:#e07d10;transform:translateY(-1px);box-shadow:0 4px 12px rgba(242,143,32,.3)}
.adm-btn-secondary{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 24px;background:#fff;color:#374151;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.adm-btn-secondary:hover{background:#f9fafb;border-color:#d1d5db}
.adm-btn-danger{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:12px 24px;background:#dc2626;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.adm-btn-danger:hover{background:#b91c1c}
.adm-btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:none;border:none;color:#6b7280;font-size:13px;font-weight:600;cursor:pointer;border-radius:8px;font-family:inherit;transition:all .2s}
.adm-btn-ghost:hover{background:#f3f4f6;color:#374151}
.adm-preview-btn{font-size:12px;color:#F28F20;background:none;border:none;cursor:pointer;font-weight:600;padding:2px 0;font-family:inherit}
.adm-preview-btn:hover{text-decoration:underline}
.adm-preview{background:#fafafa;border-radius:12px;padding:20px;border:1px solid #f3f4f6;position:relative}
.adm-preview-tag{position:absolute;top:-10px;left:16px;background:#fafafa;padding:0 8px;font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.adm-preview-content{font-size:14px;color:#374151;line-height:1.65}
.adm-preview-content img{display:block;height:auto;border-radius:8px;margin:10px 0;box-shadow:0 2px 8px rgba(0,0,0,.08);cursor:pointer;transition:opacity .2s}
.adm-preview-content img:hover{opacity:.85}
.adm-preview-content .news-img-row{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start;margin:10px 0}
.adm-preview-content .news-img-row img{margin:0!important;flex-shrink:0}
.adm-preview-content p{margin-bottom:12px;line-height:1.7}
.adm-spin{width:24px;height:24px;border:2.5px solid #e5e7eb;border-top-color:#F28F20;border-radius:50%;animation:spin .7s linear infinite}
.adm-spin-sm{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
.adm-search-wrap{position:relative;padding:0 24px;margin:16px 0 0}
.adm-search-ico{position:absolute;left:38px;top:50%;transform:translateY(-50%);pointer-events:none}
.adm-search{width:100%;padding:10px 14px 10px 38px;border:1px solid #e5e7eb;border-radius:10px;font-size:14px;outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s;background:#fafafa}
.adm-search:focus{border-color:#F28F20;box-shadow:0 0 0 3px rgba(242,143,32,.1);background:#fff}
.adm-search-x{position:absolute;right:38px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9ca3af;font-size:18px;cursor:pointer;padding:2px 6px}
.adm-list{padding:16px 24px 24px;display:flex;flex-direction:column;gap:6px}
.adm-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border:1px solid #f3f4f6;border-radius:10px;transition:all .2s}
.adm-item:hover{border-color:#e5e7eb;background:#fafafa}
.adm-item-edit{border-color:#F28F20!important;background:#FFFBF5!important}
.adm-item-info{flex:1;min-width:0}
.adm-item-title{font-size:14px;font-weight:600;color:#111827;margin:0 0 3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.adm-item-meta{display:flex;align-items:center;gap:10px}
.adm-item-date{font-size:12px;color:#9ca3af}
.adm-badge{font-size:11px;color:#F28F20;background:#FFF7ED;padding:2px 8px;border-radius:6px;font-weight:600;border:1px solid #FED7AA}
.adm-item-acts{display:flex;gap:6px;flex-shrink:0}
.adm-act{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .2s}
.adm-act-edit{color:#F28F20}.adm-act-edit:hover{background:#FFF7ED;border-color:#FED7AA}
.adm-act-del{color:#ef4444}.adm-act-del:hover{background:#FEF2F2;border-color:#FECACA}
.adm-empty{display:flex;flex-direction:column;align-items:center;gap:10px;padding:48px 24px;color:#9ca3af;font-size:14px}
.adm-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn .15s ease-out}
.adm-modal{background:#fff;border-radius:20px;padding:32px;max-width:400px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.15);animation:scaleIn .2s ease-out}
.adm-size-btn{display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 8px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;cursor:pointer;transition:all .15s;font-family:inherit;flex:1}
.adm-size-btn:hover{border-color:#F28F20;background:#FFF7ED}
@media(max-width:640px){
.adm-header-inner{padding:12px 16px}.adm-divider{display:none}.adm-title{font-size:14px}.adm-count{display:none}
.adm-body{padding:16px}.adm-row{flex-direction:column}.adm-field-date{width:100%!important}
.adm-card-body{padding:16px}.adm-card-head{padding:16px}.adm-list{padding:12px 16px 16px}.adm-search-wrap{padding:0 16px}
.adm-login-card{padding:32px 24px}.adm-modal{margin:16px}
}
`