'use client'
import { useEffect, useState } from 'react'
type Item = { id: string; title: string; text?: string; url?: string; image?: string; meta?: string; category?: string }
export default function ManagedContent({ section, title }: { section: 'education'|'documents'|'specialists'|'animals'|'about'; title: string }) {
 const [items,setItems]=useState<Item[]>([])
 useEffect(()=>{fetch(`/api/content/${section}`).then(r=>r.ok?r.json():[]).then(setItems).catch(()=>{})},[section])
 if(!items.length)return null
 return <section className="managed"><div className="inner"><h2>{title}</h2><div className="grid">{items.map(item=><article key={item.id}>{item.image&&<img src={item.image} alt={item.title}/>}<div className="body">{item.category&&<span>{item.category}</span>}<h3>{item.title}</h3>{item.meta&&<small>{item.meta}</small>}{item.text&&<p>{item.text}</p>}{item.url&&<a href={item.url} target="_blank" rel="noopener noreferrer">Открыть файл или ссылку →</a>}</div></article>)}</div></div><style jsx>{`.managed{padding:24px 16px 42px;background:#f8fafc}.inner{max-width:1120px;margin:auto}.managed h2{font-size:24px;margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}article{background:white;border:1px solid #e4e9f0;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px #1231}img{width:100%;height:220px;object-fit:cover}.body{padding:18px}h3{font-size:18px;margin:5px 0 9px}p{white-space:pre-wrap;color:#4b5563;line-height:1.55}a{display:inline-block;margin-top:9px;color:#146fa8;font-weight:700;text-decoration:none}span{font-size:11px;text-transform:uppercase;color:#f28f20;font-weight:700}small{display:block;color:#667085}`}</style></section>
}
