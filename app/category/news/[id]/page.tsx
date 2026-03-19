'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
const menuItems = [
    { href: '/o-nas', title: 'О нас' },{ href: '/vakansii', title: 'Вакансии' },{ href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },{ href: '/himiko-analiticheskie-issledovaniya', title: 'Химико-аналитическая лаборатория' },{ href: '/gruppa-gistologii-i-patomorfologii', title: 'Лаборатория гистологии и патоморфологии' },{ href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },{ href: '/tehnologiya-i-farmakokinetika', title: 'Разработка лекарственных форм' },{ href: '/gruppa-biohimii-i-gematologii', title: 'Лаборатория биохимии и гематологии' },{ href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },{ href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },{ href: '/innovatsionnaya-deyatelnost', title: 'Фармакокинетика, токсикокинетика, биоэквивалентность' },{ href: '/obespechenie-kachestva', title: 'Обеспечение качества' },{ href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },{ href: '/spetsialisty', title: 'Специалисты' },{ href: '/policy', title: 'Политики' },{ href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },{ href: '/glavnaya', title: 'Сведения об образовательной организации' },{ href: '/category/news', title: 'Новости', active: true },{ href: '/kontakty', title: 'Контакты' },
]

function groupConsecutiveImages(html: string): string {
    return html.replace(
        /(<img\b[^>]*\/?>)(\s*(?:<br\s*\/?>)?\s*<img\b[^>]*\/?>)+/gi,
        (match) => `<div class="news-img-row">${match}</div>`
    )
}

interface N { id: string; date: string; title: string; content: string }
export default function NewsArticle() {
    const params = useParams(); const id = params?.id as string
    const [lang, setLang] = useState<Language>('ru'); const [mobileMenuOpen, setMobileMenuOpen] = useState(false); const [sidebarOpen, setSidebarOpen] = useState(false)
    const [article, setArticle] = useState<N|null>(null); const [loading, setLoading] = useState(true); const t = translations[lang]
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const closeLightbox = useCallback(() => setLightboxSrc(null), [])

    useEffect(() => { fetch('/api/news').then(r=>r.json()).then(data=>{const found = data.find((n:N)=>n.id===id); setArticle(found||null); setLoading(false)}).catch(()=>setLoading(false)) }, [id])

    useEffect(() => {
        if (!lightboxSrc) return
        document.body.style.overflow = 'hidden'
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
        window.addEventListener('keydown', h)
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h) }
    }, [lightboxSrc, closeLightbox])

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'IMG' && target.closest('.news-content')) {
                e.preventDefault(); e.stopPropagation()
                setLightboxSrc((target as HTMLImageElement).src)
            }
        }
        document.addEventListener('click', handler, true)
        return () => document.removeEventListener('click', handler, true)
    }, [])

    const processedContent = article ? groupConsecutiveImages(article.content) : ''

    return (<div className="min-h-screen bg-white">
        {lightboxSrc && (
            <div
                className="fixed inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 99999, cursor: 'pointer' }}
                onClick={closeLightbox}
                onTouchEnd={e => { e.preventDefault(); closeLightbox() }}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    onTouchEnd={e => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        maxWidth: '720px',
                        maxHeight: '75vh',
                        width: 'auto',
                        margin: '0 24px',
                        cursor: 'default',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
                        background: '#fff',
                        padding: '8px',
                    }}
                >
                    <button
                        onClick={e => { e.stopPropagation(); closeLightbox() }}
                        style={{
                            position: 'absolute', top: '12px', right: '12px',
                            background: 'rgba(0,0,0,0.5)', border: 'none',
                            color: 'white', fontSize: '20px', width: '36px', height: '36px',
                            borderRadius: '10px', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            zIndex: 1, lineHeight: 1,
                        }}
                    >×</button>
                    <img
                        src={lightboxSrc} alt=""
                        style={{
                            display: 'block',
                            maxWidth: '100%',
                            maxHeight: 'calc(75vh - 16px)',
                            width: 'auto',
                            height: 'auto',
                            borderRadius: '12px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>
        )}

        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F28F20]/20 shadow-sm"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3"><div className="flex justify-between items-center h-14 sm:h-16"><Link href="/" className="flex items-center gap-2 sm:gap-4 h-full"><img src="/logo/logo-vector.png" alt="АО НПО «ДОМ ФАРМАЦИИ»" className="h-10 sm:h-12 w-auto object-contain" /><div className="hidden md:flex border-l-2 border-[#F28F20]/30 pl-4 h-12 items-center"><h1 className="text-xl font-bold text-gray-900 leading-tight">НПО «ДОМ ФАРМАЦИИ»</h1></div></Link><div className="hidden md:flex items-center gap-4"><LanguageSwitcher currentLang={lang} onLanguageChange={setLang} /><div className="text-right"><a href={`tel:${t.phone}`} className="block text-sm font-semibold text-gray-900 hover:text-[#F28F20] transition">{t.phone}</a><a href={`mailto:${t.email}`} className="block text-xs text-gray-500 hover:text-[#F28F20] transition">{t.email}</a></div></div><div className="flex md:hidden items-center gap-2"><LanguageSwitcher currentLang={lang} onLanguageChange={setLang} /><button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 hover:bg-[#F28F20]/10 rounded-lg transition" aria-label="Меню">{mobileMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}</button></div></div></div></header>
        <div className="bg-white border-b border-[#F28F20]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-3"><nav className="flex items-center text-sm text-gray-500"><Link href="/" className="hover:text-[#F28F20] transition">Главная</Link><svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg><Link href="/category/news" className="hover:text-[#F28F20] transition">Новости</Link><svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg><span className="text-gray-900 font-medium truncate max-w-[200px]">{article?.title || '...'}</span></nav></div></div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10"><div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="lg:hidden"><button onClick={()=>setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200"><span className="font-semibold text-gray-900">Меню раздела</span><svg className={`w-5 h-5 text-gray-500 transition-transform ${sidebarOpen?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>{sidebarOpen && <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"><nav className="py-2">{menuItems.map((item,i)=>item.external?<a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>:<Link key={i} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active?'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]':'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>)}</nav></div>}</div>
            <aside className="hidden lg:block w-72 flex-shrink-0"><div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"><div className="px-5 py-4" style={{background:'linear-gradient(to right, #F28F20, #e07d10)'}}><h3 className="text-white font-bold">Меню</h3></div><nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">{menuItems.map((item,i)=>item.external?<a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>:<Link key={i} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active?'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]':'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>)}</nav></div></aside>
            <article className="flex-1 min-w-0"><div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#F28F20] border-t-transparent rounded-full animate-spin"/></div> : !article ? <div className="p-8 text-center"><p className="text-gray-500 mb-4">Новость не найдена</p><Link href="/category/news" className="text-[#F28F20] hover:underline">← Вернуться к новостям</Link></div> : <>
                    <div className="px-6 sm:px-8 py-6 sm:py-8" style={{background:'linear-gradient(to right, #F28F20, #e07d10)'}}><p className="text-white/70 text-sm mb-2">{article.date}</p><h1 className="text-xl sm:text-2xl font-bold text-white">{article.title}</h1></div>
                    <div className="px-6 sm:px-8 py-6 sm:py-8"><style dangerouslySetInnerHTML={{__html: NEWS_CSS}} /><div className="news-content" dangerouslySetInnerHTML={{__html: processedContent}} /><div className="mt-8 pt-6 border-t border-gray-200"><Link href="/category/news" className="text-[#F28F20] hover:text-[#e07d10] font-medium transition">← Вернуться к новостям</Link></div></div>
                </>}
            </div></article>
        </div></main>
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-12"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16"><div className="pt-6 border-t border-gray-700 text-center text-xs sm:text-sm text-gray-400"><p className="font-medium">{t.footerCopyright}</p></div></div></footer>
        <ScrollToTop />
    </div>)
}

const NEWS_CSS = `
.news-content p { margin-bottom: 16px; line-height: 1.7; color: #374151; font-size: 15px; }
.news-content img {
    display: block;
    height: auto !important;
    border-radius: 8px;
    margin: 10px 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: opacity 0.2s;
}
.news-content img:hover { opacity: 0.85; }
.news-img-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
    margin: 10px 0;
}
.news-img-row img {
    display: block;
    margin: 0 !important;
    flex-shrink: 0;
}
.news-content ul, .news-content ol { padding-left: 24px; margin: 16px 0; }
.news-content li { margin-bottom: 8px; line-height: 1.6; color: #374151; }
.news-content strong, .news-content b { color: #111827; font-weight: 600; }
.news-content a { color: #F28F20; text-decoration: underline; }
`