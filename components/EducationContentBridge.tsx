'use client'
import { useEffect } from 'react'
import { useManagedSection } from '@/lib/useManagedSection'
type Entry={id:string;title:string;url:string;originalUrl?:string}
export default function EducationContentBridge(){
 const items=useManagedSection<Entry>('education',[])
 useEffect(()=>{ if(!items.length)return; const anchors=Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href*="doclinika.ru/wp-content/uploads/"]')); const byOriginal=new Map(items.map(x=>[x.originalUrl||x.url,x])); anchors.forEach(anchor=>{const item=byOriginal.get(anchor.href); if(!item){anchor.closest('p')?.setAttribute('hidden','true');return} anchor.href=item.url; anchor.textContent=item.title}) },[items])
 const added=items.filter(x=>!x.originalUrl)
 return added.length?<section style={{maxWidth:1120,margin:'0 auto 32px',padding:'0 16px'}}>{added.map(x=><p key={x.id}><a href={x.url} target="_blank" rel="noopener noreferrer" style={{color:'#F28F20',fontWeight:600}}>{x.title}</a></p>)}</section>:null
}
