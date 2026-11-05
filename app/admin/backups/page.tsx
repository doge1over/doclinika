'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

type Backup = {
  id: string
  createdAt: string
  reason: 'change' | 'daily' | 'manual' | 'pre_restore'
  actor: string
  size: number
  sections: string[]
}

const reasonLabels: Record<Backup['reason'], string> = {
  change: 'Перед изменением',
  daily: 'Ежедневная',
  manual: 'Ручная',
  pre_restore: 'Перед восстановлением',
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`
}

export default function BackupsPage() {
  const [items, setItems] = useState<Backup[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')

  const load = useCallback(async () => {
    setError('')
    const response = await fetch('/api/backups', { cache: 'no-store' })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Не удалось получить резервные копии')
    setItems(data)
  }, [])

  useEffect(() => { load().catch(error => setError(error.message)) }, [load])

  const create = async () => {
    setBusy('create'); setError(''); setMessage('')
    try {
      const response = await fetch('/api/backups', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'create' }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не удалось создать копию')
      setMessage('Резервная копия создана')
      await load()
    } catch (error) { setError(error instanceof Error ? error.message : 'Ошибка') } finally { setBusy('') }
  }

  const restore = async (backup: Backup) => {
    const date = new Date(backup.createdAt).toLocaleString('ru-RU')
    if (!window.confirm(`Восстановить данные из копии от ${date}?\n\nТекущее состояние будет автоматически сохранено, поэтому это действие можно отменить.`)) return
    setBusy(backup.id); setError(''); setMessage('')
    try {
      const response = await fetch('/api/backups', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'restore', id: backup.id }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не удалось восстановить копию')
      setMessage(`Данные восстановлены из копии от ${date}`)
      await load()
    } catch (error) { setError(error instanceof Error ? error.message : 'Ошибка') } finally { setBusy('') }
  }

  const remove = async (backup: Backup) => {
    const date = new Date(backup.createdAt).toLocaleString('ru-RU')
    if (!window.confirm(`Удалить резервную копию от ${date}?\n\nЭто действие нельзя отменить.`)) return
    setBusy(`delete-${backup.id}`); setError(''); setMessage('')
    try {
      const response = await fetch('/api/backups', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: backup.id }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не удалось удалить копию')
      setMessage(`Резервная копия от ${date} удалена`)
      await load()
    } catch (error) { setError(error instanceof Error ? error.message : 'Ошибка') } finally { setBusy('') }
  }

  const totalSize = items.reduce((sum, item) => sum + item.size, 0)

  return <main>
    <header><div><Link href="/admin">← В админ-панель</Link><h1>Резервные копии</h1><button onClick={create} disabled={!!busy}>{busy === 'create' ? 'Создание…' : 'Создать копию'}</button></div></header>
    <section>
      <div className="summary"><div><strong>{items.length}</strong><span>копий сохранено</span></div><div><strong>{formatSize(totalSize)}</strong><span>занято на диске</span></div><p>Система автоматически сохраняет данные перед изменениями и поддерживает дневные, недельные и месячные точки восстановления. Максимальный объём — 500 МБ.</p></div>
      {message && <div className="notice success">{message}</div>}
      {error && <div className="notice error">{error}</div>}
      <div className="table"><table><thead><tr><th>Дата и время</th><th>Тип</th><th>Автор</th><th>Размер</th><th>Данные</th><th></th></tr></thead><tbody>
        {items.map(item => <tr key={item.id}><td><b>{new Date(item.createdAt).toLocaleString('ru-RU')}</b></td><td><span className={`badge ${item.reason}`}>{reasonLabels[item.reason]}</span></td><td>{item.actor}</td><td>{formatSize(item.size)}</td><td>{item.sections.map(section => section === 'managed-content.json' ? 'Страницы' : section === 'news.json' ? 'Новости' : section).join(', ')}</td><td><div className="actions"><button className="restore" disabled={!!busy} onClick={() => restore(item)}>{busy === item.id ? 'Восстановление…' : 'Восстановить'}</button><button className="delete" disabled={!!busy} onClick={() => remove(item)}>{busy === `delete-${item.id}` ? 'Удаление…' : 'Удалить'}</button></div></td></tr>)}
        {!items.length && <tr><td colSpan={6} className="empty">Резервных копий пока нет</td></tr>}
      </tbody></table></div>
    </section>
    <style jsx>{`main{min-height:100vh;background:#f5f7fa;color:#172033;font-family:Arial}header{background:#172033;color:white}header>div,section{max-width:1250px;margin:auto;padding:22px 28px}header>div{display:flex;align-items:center;gap:20px}header a{color:#fdba74;text-decoration:none;font-weight:700}h1{font-size:24px;margin:0;flex:1}button{border:0;border-radius:8px;padding:10px 15px;font-weight:700;cursor:pointer}header button{background:#F28F20;color:white}button:disabled{cursor:wait;opacity:.6}.summary{display:grid;grid-template-columns:170px 170px 1fr;gap:15px;margin-bottom:18px}.summary>div,.summary>p{margin:0;padding:18px;border:1px solid #e0e5ec;border-radius:12px;background:white}.summary strong,.summary span{display:block}.summary strong{font-size:23px;color:#146FA8}.summary span{margin-top:4px;font-size:12px;color:#6b7280}.summary p{font-size:13px;line-height:1.55;color:#4b5563}.notice{margin-bottom:15px;padding:13px 16px;border-radius:9px;font-size:14px}.success{background:#dcfce7;color:#166534}.error{background:#fee2e2;color:#991b1b}.table{overflow:auto;background:white;border:1px solid #e0e5ec;border-radius:14px;box-shadow:0 3px 12px #1231}table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:13px 14px;border-bottom:1px solid #edf0f4;vertical-align:middle}th{background:#fff7ed;color:#9a4d08;font-size:11px;text-transform:uppercase;white-space:nowrap}.badge{display:inline-block;border-radius:999px;padding:5px 9px;background:#e8f7fb;color:#087e99;font-size:11px;font-weight:700;white-space:nowrap}.badge.manual{background:#fff0dc;color:#a8550d}.badge.pre_restore{background:#ede9fe;color:#6d28d9}.actions{display:flex;gap:7px}.restore{background:#146FA8;color:white;white-space:nowrap}.delete{background:#fee2e2;color:#b91c1c;white-space:nowrap}.empty{text-align:center;color:#6b7280;padding:35px}@media(max-width:800px){header>div,section{padding:16px}header>div{flex-wrap:wrap}h1{order:-1;width:100%;flex-basis:100%}.summary{grid-template-columns:1fr 1fr}.summary p{grid-column:1/-1}}`}</style>
  </main>
}
