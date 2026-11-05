import { NextRequest, NextResponse } from 'next/server'
import { getSession, getTokenFromHeaders, hashPassword, passwordIsStrong, PERMISSIONS, publicUser, readUsers, saveUsers, type Permission, type Role, type UserRecord } from '@/lib/auth'
import { writeAudit } from '@/lib/audit'

function admin(req: NextRequest) { const user = getSession(getTokenFromHeaders(req.headers)); return user?.role === 'admin' ? user : null }
export async function GET(req: NextRequest) {
    if (!admin(req)) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
    return NextResponse.json(readUsers().map(publicUser), { headers: { 'Cache-Control': 'no-store' } })
}
export async function POST(req: NextRequest) {
    if (!admin(req)) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
    const body = await req.json(); const users = readUsers()
    const username = String(body.username || '').trim().toLowerCase(); const password = String(body.password || '')
    if (!/^[a-z0-9._-]{3,40}$/i.test(username)) return NextResponse.json({ error: 'Логин: 3–40 латинских символов, цифр, точек, дефисов' }, { status: 400 })
    if (users.some(u => u.username.toLowerCase() === username)) return NextResponse.json({ error: 'Такой логин уже существует' }, { status: 409 })
    if (!passwordIsStrong(password)) return NextResponse.json({ error: 'Пароль: минимум 10 символов, буквы и цифры' }, { status: 400 })
    const role: Role = body.role === 'admin' ? 'admin' : 'editor'; const { hash, salt } = hashPassword(password)
    const permissions = Array.isArray(body.permissions) ? body.permissions.filter((p: unknown): p is Permission => typeof p === 'string' && PERMISSIONS.includes(p as Permission)) : []
    const user: UserRecord = { id: crypto.randomUUID(), username, name: String(body.name || username).slice(0, 100), role, permissions, passwordHash: hash, salt, active: true, createdAt: new Date().toISOString() }
    users.push(user); saveUsers(users); writeAudit(admin(req),'user_created','users',req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'127.0.0.1',user.username,role); return NextResponse.json(publicUser(user), { status: 201 })
}
export async function PUT(req: NextRequest) {
    const current = admin(req); if (!current) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
    const body = await req.json(); const users = readUsers(); const index = users.findIndex(u => u.id === body.id)
    if (index < 0) return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 })
    const user = users[index]; user.name = String(body.name || user.name).slice(0, 100); user.role = body.role === 'admin' ? 'admin' : 'editor'
    user.permissions = Array.isArray(body.permissions) ? body.permissions.filter((p: unknown): p is Permission => typeof p === 'string' && PERMISSIONS.includes(p as Permission)) : []
    user.active = body.active !== false
    if (body.password) { if (!passwordIsStrong(String(body.password))) return NextResponse.json({ error: 'Пароль: минимум 10 символов, буквы и цифры' }, { status: 400 }); const changed = hashPassword(String(body.password)); user.passwordHash = changed.hash; user.salt = changed.salt }
    saveUsers(users); writeAudit(current,'user_updated','users',req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'127.0.0.1',user.username,user.role); return NextResponse.json(publicUser(user))
}
export async function DELETE(req: NextRequest) {
    const current = admin(req); if (!current) return NextResponse.json({ error: 'Доступ только администратору' }, { status: 403 })
    const { id } = await req.json(); if (id === current.id) return NextResponse.json({ error: 'Нельзя удалить собственную учётную запись' }, { status: 400 })
    const users = readUsers(); const filtered = users.filter(u => u.id !== id); if (filtered.length === users.length) return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 })
    const removed=users.find(u=>u.id===id); saveUsers(filtered); writeAudit(current,'user_deleted','users',req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'127.0.0.1',removed?.username); return NextResponse.json({ success: true })
}
