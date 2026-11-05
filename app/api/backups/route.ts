import { NextRequest, NextResponse } from 'next/server'
import { createBackup, deleteBackup, ensureDailyBackup, listBackups, restoreBackup } from '@/lib/backups'
import { getClientIP, getSession, getTokenFromHeaders } from '@/lib/auth'
import { writeAudit } from '@/lib/audit'

function requireAdmin(req: NextRequest) {
  const user = getSession(getTokenFromHeaders(req.headers))
  return user?.role === 'admin' ? user : null
}

export async function GET(req: NextRequest) {
  const user = requireAdmin(req)
  if (!user) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
  try { ensureDailyBackup() } catch { /* listing must remain available if daily maintenance fails */ }
  return NextResponse.json(listBackups(), { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: NextRequest) {
  const user = requireAdmin(req)
  if (!user) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
  let body: { action?: string; id?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 }) }

  try {
    if (body.action === 'create') {
      const backup = createBackup('manual', user.username)
      writeAudit(user, 'backup_created', 'backups', getClientIP(req.headers), backup.id)
      return NextResponse.json({ success: true, backup })
    }
    if (body.action === 'restore' && body.id) {
      const restored = restoreBackup(body.id, user.username)
      writeAudit(user, 'backup_restored', 'backups', getClientIP(req.headers), restored.id, restored.createdAt)
      return NextResponse.json({ success: true, restored: { id: restored.id, createdAt: restored.createdAt } })
    }
    return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Операция с резервной копией не выполнена'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const user = requireAdmin(req)
  if (!user) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
  let body: { id?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 }) }
  if (!body.id) return NextResponse.json({ error: 'Не указана резервная копия' }, { status: 400 })
  try {
    const deleted = deleteBackup(body.id)
    writeAudit(user, 'backup_deleted', 'backups', getClientIP(req.headers), deleted.id, deleted.createdAt)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось удалить резервную копию'
    return NextResponse.json({ error: message }, { status: 404 })
  }
}
