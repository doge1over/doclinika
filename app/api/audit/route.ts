import { NextRequest, NextResponse } from 'next/server'
import { getSession, getTokenFromHeaders } from '@/lib/auth'
import { readAudit } from '@/lib/audit'
export async function GET(req: NextRequest) {
 const user=getSession(getTokenFromHeaders(req.headers))
 if(user?.role!=='admin') return NextResponse.json({error:'Доступ только администратору'},{status:403})
 return NextResponse.json(readAudit(Number(req.nextUrl.searchParams.get('limit'))||500),{headers:{'Cache-Control':'no-store'}})
}
