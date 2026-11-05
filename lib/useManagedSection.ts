'use client'
import { useEffect, useState } from 'react'
export function useManagedSection<T>(section: string, fallback: T[]): T[] {
 const [items,setItems]=useState<T[]>(fallback)
 useEffect(()=>{fetch(`/api/content/${section}`).then(r=>r.ok?r.json():Promise.reject()).then(data=>setItems(data)).catch(()=>{})},[section])
 return items
}
