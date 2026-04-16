'use client'

import { useState, useEffect } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'

const sideMenuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования', active: true },
    { href: '/himiko-analiticheskie-issledovaniya', title: 'Химико-аналитическая лаборатория' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Лаборатория гистологии и патоморфологии' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },
    { href: '/tehnologiya-i-farmakokinetika', title: 'Разработка лекарственных форм' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Лаборатория биохимии и гематологии' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/innovatsionnaya-deyatelnost', title: 'Фармакокинетика, токсикокинетика, биоэквивалентность' },
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const segments = [
    { id: 'tox', label: 'Токсикология', color: '#F28F20', desc: 'Острая, субхроническая и хроническая токсичность. Местно-раздражающее действие, иммунотоксичность, генотоксичность.' },
    { id: 'pharm', label: 'Фармакология', color: '#F28F20', desc: 'Специфическая фармакологическая активность, фармакологическая безопасность, дозозависимые эффекты.' },
    { id: 'pk', label: 'Фармакокинетика', color: '#F28F20', desc: 'ADME-исследования, биодоступность, распределение по тканям, метаболизм, элиминация.' },
    { id: 'repro', label: 'Репродуктивная токсичность', color: '#F28F20', desc: 'Фертильность, эмбриофетальное развитие, пери- и постнатальное развитие потомства.' },
    { id: 'onco', label: 'Канцерогенность', color: '#F28F20', desc: 'Оценка канцерогенного потенциала, долгосрочные исследования на грызунах.' },
    { id: 'immuno', label: 'Иммунология', color: '#F28F20', desc: 'Иммуногенность, иммунотоксикология, аллергенность, анафилактогенность.' },
    { id: 'safety', label: 'Фармакобезопасность', color: '#F28F20', desc: 'Влияние на сердечно-сосудистую, дыхательную и центральную нервную систему.' },
    { id: 'bio', label: 'Биоанализ', color: '#F28F20', desc: 'Разработка и валидация биоаналитических методик, определение в биоматрицах.' },
]

// Иконки 40x40 — фармацевтическая тематика
function SegIcon({ id, color }: { id: string; color: string }) {
    const p = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    switch (id) {
        // Токсикология — колба с жидкостью и каплей
        case 'tox': return (
            <svg {...p}>
                <path d="M15 5h10"/>
                <path d="M17 5v10L8 33a2 2 0 002 2h20a2 2 0 002-2L23 15V5"/>
                <path d="M12 26h16"/>
                <circle cx="17" cy="30" r="1.5" fill={color}/>
                <circle cx="23" cy="29" r="1" fill={color}/>
            </svg>
        )
        // Фармакология — капсула
        case 'pharm': return (
            <svg {...p}>
                <rect x="8" y="12" width="24" height="16" rx="8"/>
                <line x1="20" y1="12" x2="20" y2="28"/>
                <line x1="13" y1="17" x2="13" y2="23" strokeWidth="1.5" opacity="0.5"/>
                <line x1="27" y1="17" x2="27" y2="23" strokeWidth="1.5" opacity="0.5"/>
            </svg>
        )
        // Фармакокинетика — график с осями
        case 'pk': return (
            <svg {...p}>
                <polyline points="6 32 12 22 18 26 24 12 30 18 34 10"/>
                <line x1="6" y1="34" x2="34" y2="34"/>
                <line x1="6" y1="8" x2="6" y2="34"/>
                <circle cx="24" cy="12" r="2" fill={color}/>
            </svg>
        )
        // Репродуктивная токсичность — ДНК спираль
        case 'repro': return (
            <svg {...p}>
                <path d="M12 4c0 7 16 7 16 14s-16 7-16 14"/>
                <path d="M28 4c0 7-16 7-16 14s16 7 16 14"/>
                <line x1="13" y1="11" x2="27" y2="11" strokeWidth="1.5" opacity="0.4"/>
                <line x1="13" y1="20" x2="27" y2="20" strokeWidth="1.5" opacity="0.4"/>
                <line x1="13" y1="29" x2="27" y2="29" strokeWidth="1.5" opacity="0.4"/>
            </svg>
        )
        // Канцерогенность — клетка под микроскопом
        case 'onco': return (
            <svg {...p}>
                <circle cx="18" cy="18" r="10"/>
                <circle cx="18" cy="18" r="4" strokeWidth="1.5"/>
                <circle cx="18" cy="18" r="1.5" fill={color}/>
                <line x1="26" y1="26" x2="35" y2="35" strokeWidth="3"/>
                <line x1="18" y1="6" x2="18" y2="10" strokeWidth="1.5" opacity="0.4"/>
                <line x1="18" y1="26" x2="18" y2="30" strokeWidth="1.5" opacity="0.4"/>
            </svg>
        )
        // Иммунология — щит с крестом
        case 'immuno': return (
            <svg {...p}>
                <path d="M20 4l12 5v8c0 8-5 14-12 17-7-3-12-9-12-17V9l12-5z"/>
                <line x1="20" y1="14" x2="20" y2="24"/>
                <line x1="15" y1="19" x2="25" y2="19"/>
            </svg>
        )
        // Фармакобезопасность — сердце с пульсом
        case 'safety': return (
            <svg {...p}>
                <path d="M20 10c-3-8-14-7-14 2 0 8 14 19 14 19s14-11 14-19c0-9-11-10-14-2z"/>
                <polyline points="12 20 16 20 18 16 20 24 22 18 26 20" strokeWidth="1.8"/>
            </svg>
        )
        // Биоанализ — пробирка с каплей
        case 'bio': return (
            <svg {...p}>
                <path d="M14 6v18a6 6 0 0012 0V6"/>
                <line x1="12" y1="6" x2="28" y2="6"/>
                <line x1="14" y1="20" x2="26" y2="20" strokeWidth="1.5" opacity="0.4"/>
                <circle cx="20" cy="27" r="2" fill={color}/>
                <circle cx="17" cy="24" r="1" fill={color}/>
            </svg>
        )
        default: return <svg {...p}><circle cx="20" cy="20" r="12"/></svg>
    }
}

// Сегмент с одинаковым зазором (в пикселях) по всей длине
function segPath(cx: number, cy: number, r1: number, r2: number, startDeg: number, endDeg: number, gapPx: number) {
    const rad = Math.PI / 180
    // Угловой отступ для постоянной ширины зазора
    const gapOuter = (gapPx / 2) / r2 // в радианах
    const gapInner = (gapPx / 2) / r1

    const outerA1 = startDeg * rad + gapOuter
    const outerA2 = endDeg * rad - gapOuter
    const innerA1 = startDeg * rad + gapInner
    const innerA2 = endDeg * rad - gapInner

    const lg = (endDeg - startDeg) > 180 ? 1 : 0
    return [
        `M${cx + r2 * Math.cos(outerA1)} ${cy + r2 * Math.sin(outerA1)}`,
        `A${r2} ${r2} 0 ${lg} 1 ${cx + r2 * Math.cos(outerA2)} ${cy + r2 * Math.sin(outerA2)}`,
        `L${cx + r1 * Math.cos(innerA2)} ${cy + r1 * Math.sin(innerA2)}`,
        `A${r1} ${r1} 0 ${lg} 0 ${cx + r1 * Math.cos(innerA1)} ${cy + r1 * Math.sin(innerA1)}Z`,
    ].join(' ')
}

function CircularWheel() {
    const [active, setActive] = useState<string | null>(null)
    const [ready, setReady] = useState(false)
    useEffect(() => { setReady(true) }, [])

    const cx = 300, cy = 300, r1 = 110, r2 = 275
    const n = segments.length, step = 360 / n, gapPx = 6
    const iconR = (r1 + r2) / 2
    const activeSeg = segments.find(s => s.id === active)

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Направления исследований</h2>
            <p className="text-sm text-gray-500 mb-6">Нажмите на сегмент для подробной информации</p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <div style={{ width: '100%', maxWidth: 700 }}>
                    <svg viewBox="0 0 600 600" style={{ width: '100%', height: 'auto', display: 'block' }} onMouseLeave={() => setActive(null)}>
                        {segments.map((seg, i) => {
                            const a1 = -90 + i * step
                            const a2 = -90 + (i + 1) * step
                            const mid = ((a1 + a2) / 2) * Math.PI / 180
                            const ix = cx + iconR * Math.cos(mid)
                            const iy = cy + iconR * Math.sin(mid)
                            const isOn = active === seg.id

                            return (
                                <g key={seg.id}
                                   style={{
                                       cursor: 'pointer',
                                       opacity: ready ? 1 : 0,
                                       transition: `opacity 0.8s ${i * 0.1}s, transform 0.5s ease`,
                                       transform: isOn ? 'scale(1.06)' : 'scale(1)',
                                       transformOrigin: `${cx}px ${cy}px`,
                                   }}
                                   onClick={() => setActive(active === seg.id ? null : seg.id)}
                                   onMouseEnter={() => setActive(seg.id)}>
                                    <path
                                        d={segPath(cx, cy, r1, r2, a1, a2, gapPx)}
                                        fill={isOn ? '#e07d10' : '#F28F20'}
                                        stroke="#fff"
                                        strokeWidth={2}
                                        style={{ transition: 'fill 0.5s ease' }}
                                    />
                                    <circle cx={ix} cy={iy} r={36}
                                            fill={isOn ? '#fff' : 'rgba(255,255,255,0.2)'}
                                            stroke={isOn ? '#fff' : 'rgba(255,255,255,0.5)'}
                                            strokeWidth={isOn ? 2.5 : 1.5}
                                            style={{ transition: 'all 0.5s ease' }}
                                    />
                                    <foreignObject x={ix - 20} y={iy - 20} width={40} height={40} style={{ pointerEvents: 'none' }}>
                                        <SegIcon id={seg.id} color={isOn ? '#F28F20' : '#fff'} />
                                    </foreignObject>
                                </g>
                            )
                        })}

                        {/* Центр */}
                        <circle cx={cx} cy={cy} r={r1} fill="#F28F20" />
                        <circle cx={cx} cy={cy} r={r1 - 3} fill="#F28F20" stroke="#e07d10" strokeWidth="1.5" />
                        <text x={cx} y={cy - 14} textAnchor="middle" fill="#fff" fontSize="28" fontWeight="800" fontFamily="system-ui, sans-serif">ДОМ</text>
                        <text x={cx} y={cy + 14} textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="system-ui, sans-serif">ФАРМАЦИИ</text>
                    </svg>
                </div>

                <div style={{ width: '100%', maxWidth: 700, minHeight: 80 }}>
                    {activeSeg ? (
                        <div key={active} className="bg-white rounded-2xl border-2 shadow-lg p-5 text-left" style={{ borderColor: activeSeg.color, animation: 'cwSlide 0.5s ease' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: activeSeg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <SegIcon id={activeSeg.id} color="#fff" />
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-900">{activeSeg.label}</div>
                                    <div className="text-sm text-gray-500 mt-1 leading-relaxed">{activeSeg.desc}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-gray-400 text-sm">
                            Наведите на сегмент для просмотра описания
                        </div>
                    )}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: '@keyframes cwSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}' }} />
        </div>
    )
}

export default function DoklinicheskieIssledovaniya() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const t = translations[lang]

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F28F20]/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 h-full">
                            <img src="/logo/logo-vector.png" alt="АО НПО «ДОМ ФАРМАЦИИ»" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className="hidden md:flex border-l-2 border-[#F28F20]/30 pl-4 h-12 items-center"><h1 className="text-xl font-bold text-gray-900">НПО «ДОМ ФАРМАЦИИ»</h1></div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md">Заявка на ДКИ</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md">Заявка на НИР</Link>
                            </div>
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <div className="text-right">
                                <a href={`tel:${t.phone}`} className="block text-sm font-semibold text-gray-900 hover:text-[#F28F20] transition">{t.phone}</a>
                                <a href={`mailto:${t.email}`} className="block text-xs text-gray-500 hover:text-[#F28F20] transition">{t.email}</a>
                            </div>
                        </div>
                        <div className="flex md:hidden items-center gap-2">
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 hover:bg-[#F28F20]/10 rounded-lg transition" aria-label="Меню">
                                {mobileMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                            </button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[70vh] overflow-y-auto"><div className="px-4 py-4 space-y-3"><Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] text-white text-center font-medium rounded-lg">Заявка на ДКИ</Link><Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] text-white text-center font-medium rounded-lg">Заявка на НИР</Link></div></div>}
            </header>

            <div className="bg-white border-b border-[#F28F20]/20"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-3"><nav className="flex items-center text-sm text-gray-500"><Link href="/" className="hover:text-[#F28F20] transition">Главная</Link><svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg><span className="text-gray-900 font-medium">Доклинические исследования</span></nav></div></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200"><span className="font-semibold text-gray-900">Меню раздела</span><svg className={`w-5 h-5 text-gray-500 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                        {sidebarOpen && <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"><nav className="py-2">{sideMenuItems.map((item, i) => item.external ? <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a> : <Link key={i} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>)}</nav></div>}
                    </div>

                    <aside className="hidden lg:block w-72 flex-shrink-0"><div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"><div className="px-5 py-4" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}><h3 className="text-white font-bold">Меню</h3></div><nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">{sideMenuItems.map((item, i) => item.external ? <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a> : <Link key={i} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>)}</nav></div></aside>

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(135deg, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Доклинические исследования</h1>
                                <p className="text-white/80 mt-2 text-sm">Полный цикл в соответствии с принципами GLP</p>
                            </div>
                            <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-10">
                                <CircularWheel />
                                <div className="bg-gradient-to-r from-[#F28F20]/10 to-[#14B7E0]/10 rounded-xl p-6 text-center">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Готовы начать исследование?</h3>
                                    <p className="text-sm text-gray-600 mb-4">Оставьте заявку и наши специалисты свяжутся с вами</p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link href="/zayavka-doklinicheskie" className="px-6 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white font-medium rounded-lg shadow-md text-sm">Заявка на доклинические исследования</Link>
                                        <Link href="/zayavka-nir" className="px-6 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white font-medium rounded-lg shadow-md text-sm">Заявка на НИР</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-12"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-10"><div className="pt-6 border-t border-gray-700 text-center text-xs text-gray-400"><p>{t.footerCopyright}</p></div></div></footer>
            <ScrollToTop />
        </div>
    )
}