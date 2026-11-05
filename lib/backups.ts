import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { gzipSync, gunzipSync } from 'zlib'

export type BackupReason = 'change' | 'daily' | 'manual' | 'pre_restore'

type BackupPayload = {
  version: 1
  id: string
  createdAt: string
  reason: BackupReason
  actor: string
  hash: string
  files: Record<string, string>
}

export type BackupInfo = Omit<BackupPayload, 'files'> & {
  size: number
  sections: string[]
}

const DATA_DIR = path.join(process.cwd(), 'data')
const BACKUP_DIR = path.join(DATA_DIR, 'backups')
const SOURCES = ['managed-content.json', 'news.json'] as const
const MAX_BYTES = Math.max(10, Number(process.env.BACKUP_MAX_MB) || 500) * 1024 * 1024
const MAX_REVISIONS = Math.max(5, Number(process.env.BACKUP_REVISION_LIMIT) || 20)

function ensureDirectory() {
  fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 })
}

function readCurrentFiles() {
  const files: Record<string, string> = {}
  for (const name of SOURCES) {
    const file = path.join(DATA_DIR, name)
    files[name] = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : name === 'news.json' ? '[]' : '{}'
  }
  return files
}

function contentHash(files: Record<string, string>) {
  const hash = crypto.createHash('sha256')
  for (const name of [...SOURCES].sort()) hash.update(name).update('\0').update(files[name] || '').update('\0')
  return hash.digest('hex')
}

function backupPath(id: string) {
  if (!/^backup-[a-zA-Z0-9_-]+$/.test(id)) throw new Error('Некорректный идентификатор резервной копии')
  return path.join(BACKUP_DIR, `${id}.json.gz`)
}

function readPayload(file: string): BackupPayload {
  const parsed = JSON.parse(gunzipSync(fs.readFileSync(file)).toString('utf8')) as BackupPayload
  if (parsed.version !== 1 || !parsed.id || !parsed.createdAt || !parsed.files) throw new Error('Повреждённая резервная копия')
  return parsed
}

function allBackupFiles() {
  ensureDirectory()
  return fs.readdirSync(BACKUP_DIR)
    .filter(name => /^backup-[a-zA-Z0-9_-]+\.json\.gz$/.test(name))
    .map(name => path.join(BACKUP_DIR, name))
}

export function listBackups(): BackupInfo[] {
  return allBackupFiles().flatMap(file => {
    try {
      const payload = readPayload(file)
      return [{
        version: payload.version,
        id: payload.id,
        createdAt: payload.createdAt,
        reason: payload.reason,
        actor: payload.actor,
        hash: payload.hash,
        size: fs.statSync(file).size,
        sections: Object.keys(payload.files),
      }]
    } catch { return [] }
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

function weekKey(date: Date) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  return `${utc.getUTCFullYear()}-${String(Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)).padStart(2, '0')}`
}

function pruneBackups() {
  const backups = listBackups()
  const keep = new Set<string>()
  backups.filter(item => item.reason !== 'daily').slice(0, MAX_REVISIONS).forEach(item => keep.add(item.id))

  const daily = backups.filter(item => item.reason === 'daily')
  const now = Date.now()
  const days = new Set<string>(), weeks = new Set<string>(), months = new Set<string>()
  for (const item of daily) {
    const date = new Date(item.createdAt)
    const ageDays = (now - date.getTime()) / 86400000
    const day = item.createdAt.slice(0, 10)
    const week = weekKey(date)
    const month = item.createdAt.slice(0, 7)
    if (ageDays <= 14 && !days.has(day)) { days.add(day); keep.add(item.id) }
    if (ageDays <= 56 && !weeks.has(week)) { weeks.add(week); keep.add(item.id) }
    if (ageDays <= 366 && !months.has(month)) { months.add(month); keep.add(item.id) }
  }

  for (const item of backups) if (!keep.has(item.id)) {
    try { fs.rmSync(backupPath(item.id), { force: true }) } catch { /* keep maintenance non-fatal */ }
  }

  const remaining = listBackups().sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  let total = remaining.reduce((sum, item) => sum + item.size, 0)
  const newestId = remaining.at(-1)?.id
  for (const item of remaining) {
    if (total <= MAX_BYTES) break
    if (item.id === newestId) continue
    try { fs.rmSync(backupPath(item.id), { force: true }); total -= item.size } catch { /* non-fatal */ }
  }
}

export function createBackup(reason: BackupReason, actor = 'system'): BackupInfo {
  ensureDirectory()
  const files = readCurrentFiles()
  const hash = contentHash(files)
  const newest = listBackups()[0]
  if (newest?.hash === hash && reason === 'change') return newest

  const createdAt = new Date().toISOString()
  const id = `backup-${createdAt.replace(/[:.]/g, '-')}-${crypto.randomBytes(4).toString('hex')}`
  const payload: BackupPayload = { version: 1, id, createdAt, reason, actor, hash, files }
  const target = backupPath(id)
  const temp = `${target}.${process.pid}.tmp`
  fs.writeFileSync(temp, gzipSync(Buffer.from(JSON.stringify(payload)), { level: 9 }), { mode: 0o600 })
  fs.renameSync(temp, target)
  pruneBackups()
  return listBackups().find(item => item.id === id) || {
    version: 1, id, createdAt, reason, actor, hash, size: fs.statSync(target).size, sections: Object.keys(files),
  }
}

export function ensureDailyBackup() {
  const today = new Date().toISOString().slice(0, 10)
  const existing = listBackups().find(item => item.reason === 'daily' && item.createdAt.startsWith(today))
  return existing || createBackup('daily', 'system')
}

export function deleteBackup(id: string) {
  const file = backupPath(id)
  if (!fs.existsSync(file)) throw new Error('Резервная копия не найдена')
  const payload = readPayload(file)
  fs.rmSync(file, { force: true })
  return payload
}

function atomicWrite(file: string, content: string) {
  const temp = `${file}.${process.pid}.restore.tmp`
  fs.writeFileSync(temp, content, { encoding: 'utf8', mode: 0o600 })
  JSON.parse(content)
  fs.renameSync(temp, file)
}

export function restoreBackup(id: string, actor: string) {
  ensureDirectory()
  const payload = readPayload(backupPath(id))
  for (const name of SOURCES) {
    if (typeof payload.files[name] !== 'string') throw new Error(`В копии отсутствует ${name}`)
    JSON.parse(payload.files[name])
  }
  createBackup('pre_restore', actor)
  for (const name of SOURCES) {
    const content = payload.files[name]
    atomicWrite(path.join(DATA_DIR, name), content)
  }
  return payload
}
