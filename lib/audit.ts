import fs from 'fs'
import path from 'path'
import type { SessionUser } from './auth'

const AUDIT_FILE = path.join(process.cwd(), 'data', 'audit.log')
export interface AuditEntry { id:string; timestamp:string; userId:string; username:string; action:string; section:string; target?:string; ip:string; details?:string }

export function writeAudit(user: SessionUser | null, action: string, section: string, ip: string, target?: string, details?: string) {
  const entry: AuditEntry = { id: crypto.randomUUID(), timestamp: new Date().toISOString(), userId: user?.id || 'anonymous', username: user?.username || 'anonymous', action, section, target, ip, details }
  fs.mkdirSync(path.dirname(AUDIT_FILE), { recursive: true })
  fs.appendFileSync(AUDIT_FILE, `${JSON.stringify(entry)}\n`, { encoding: 'utf8', mode: 0o600 })
}
export function readAudit(limit = 500): AuditEntry[] {
  try { return fs.readFileSync(AUDIT_FILE,'utf8').split('\n').filter(Boolean).slice(-Math.min(Math.max(limit,1),2000)).reverse().map(line=>JSON.parse(line)) } catch { return [] }
}
