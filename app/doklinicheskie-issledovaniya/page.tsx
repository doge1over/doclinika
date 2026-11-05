'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

type BranchItem = {
    title: string
    href?: string
}

type Branch = {
    id: string
    title: string
    color: string
    href?: string
    items: BranchItem[]
}

const BRANCHES: Branch[] = [
    { id: 'tox', title: 'Токсикология', color: '#F28F20', items: [{ title: 'Острая токсичность' }, { title: 'Субхроническая токсичность' }, { title: 'Хроническая токсичность' }, { title: 'Генотоксичность' }] },
    { id: 'safety', title: 'Фармакобезопасность', color: '#E91E63', items: [{ title: 'Сердечно-сосудистая система' }, { title: 'Дыхательная система' }, { title: 'Центральная нервная система' }] },
    {
        id: 'immuno',
        title: 'Иммуноактивность',
        color: '#00BCD4',
        href: '/immunogennost-aktivnost',
        items: [
            { title: 'Оценка иммуноактивности' },
            { title: 'Биологическая активность' },
            { title: 'Механизмы действия' },
        ],
    },
    {
        id: 'development',
        title: 'Фармразработка',
        color: '#03A9F4',
        href: '/farmacevticheskaya-razrabotka',
        items: [
            { title: 'Технологии кинетики анализа лекарственных средств' },
            { title: 'Фармакокинетика, иммуногенность / иммуноактивность' },
        ],
    },
    { id: 'pharm', title: 'Фармакология', color: '#146FA8', items: [{ title: 'Специфическая активность' }, { title: 'Дозозависимые эффекты' }, { title: 'Безопасность' }, { title: 'Фармакодинамика' }] },
    {
        id: 'pk',
        title: 'Фармакокинетика',
        color: '#14B7E0',
        href: '/farmakokinetika',
        items: [
            { title: 'ADME-исследования' },
            { title: 'Биодоступность' },
            { title: 'Распределение и метаболизм' },
        ],
    },
    { id: 'repro', title: 'Репродуктивная токсичность', color: '#9C27B0', items: [{ title: 'Фертильность' }, { title: 'Эмбриофетальное развитие' }, { title: 'Постнатальное развитие' }] },
    { id: 'onco', title: 'Канцерогенность', color: '#FF9800', items: [{ title: 'Исследования in vivo' }, { title: 'Исследования in vitro' }, { title: 'Долгосрочные исследования' }] },
]

function MindMapMobile() {
    return (
        <div className="md:hidden space-y-8 py-2">
            {BRANCHES.map(branch => (
                <div key={branch.id}>
                    {branch.href ? (
                        <Link
                            href={branch.href}
                            className="inline-block px-5 py-2.5 rounded-full border-2 bg-white font-semibold text-base"
                            style={{ borderColor: branch.color, color: branch.color }}
                        >
                            {branch.title}
                        </Link>
                    ) : (
                        <div
                            className="inline-block px-5 py-2.5 rounded-full border-2 bg-white font-semibold text-base"
                            style={{ borderColor: branch.color, color: branch.color }}
                        >
                            {branch.title}
                        </div>
                    )}
                    <div className="ml-5 mt-2">
                        {branch.items.map((item, i) => {
                            const isLast = i === branch.items.length - 1
                            return (
                                <div key={i} className="flex items-stretch">
                                    <div className="relative w-6 shrink-0">
                                        {/* Вертикальный ствол: до низа или до начала дуги (для последнего) */}
                                        <div
                                            className="absolute left-0 top-0 w-0.5"
                                            style={{
                                                backgroundColor: branch.color,
                                                bottom: isLast ? 'calc(50% + 10px)' : 0,
                                            }}
                                        />
                                        {/* Дуга — четверть круга, точно соединяющая ствол с горизонталью */}
                                        <svg
                                            className="absolute"
                                            style={{
                                                left: 0,
                                                top: 'calc(50% - 10px)',
                                                width: '12px',
                                                height: '11px',
                                                overflow: 'visible',
                                            }}
                                            viewBox="0 0 12 11"
                                        >
                                            <path
                                                d="M 1 0 A 10 10 0 0 0 11 10"
                                                fill="none"
                                                stroke={branch.color}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                        {/* Горизонтальное продолжение */}
                                        <div
                                            className="absolute h-0.5"
                                            style={{
                                                left: '11px',
                                                right: 0,
                                                top: 'calc(50% - 1px)',
                                                backgroundColor: branch.color,
                                            }}
                                        />
                                    </div>
                                    {item.href ? (
                                        <Link href={item.href} className="py-2 text-[15px] text-gray-700 hover:text-[#03A9F4] leading-snug transition-colors">
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <div className="py-2 text-[15px] text-gray-700 leading-snug">{item.title}</div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

function MindMapSVG() {
    return (
        <svg viewBox="-220 0 1940 880" preserveAspectRatio="xMidYMid meet" className="mm-svg">
            <defs>
                <linearGradient id="g-tox" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#F28F20"/><stop offset="1" stopColor="#FFB877"/></linearGradient>
                <linearGradient id="g-safety" x1="1" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#E91E63"/><stop offset="1" stopColor="#F779A8"/></linearGradient>
                <linearGradient id="g-immuno" x1="1" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#00BCD4"/><stop offset="1" stopColor="#7DE2EE"/></linearGradient>
                <linearGradient id="g-bio" x1="1" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#03A9F4"/><stop offset="1" stopColor="#7DD2FA"/></linearGradient>
                <linearGradient id="g-pharm" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#146FA8"/><stop offset="1" stopColor="#6EA9CF"/></linearGradient>
                <linearGradient id="g-pk" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#14B7E0"/><stop offset="1" stopColor="#7DD9EE"/></linearGradient>
                <linearGradient id="g-repro" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9C27B0"/><stop offset="1" stopColor="#C77DD3"/></linearGradient>
                <linearGradient id="g-onco" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF9800"/><stop offset="1" stopColor="#FFC077"/></linearGradient>
            </defs>

            {/* LEFT */}
            <g className="mm-branch">
                <path d="M 700 420 C 600 380 575 200 520 200" stroke="url(#g-tox)" strokeWidth="2.5"/>
                <rect x="140" y="100" width="380" height="156" rx="18" fill="#fff" stroke="#F28F20" strokeWidth="2"/>
                <rect x="140" y="100" width="380" height="44" rx="18" fill="#F28F20"/><rect x="140" y="118" width="380" height="26" fill="#F28F20"/>
                <path d="M 140 144 H 520" stroke="#F28F20" strokeWidth="2"/>
                <text className="mm-pill" x="330" y="123" textAnchor="middle" dominantBaseline="central" fill="#fff">Токсикология</text>
                <text className="mm-card-item" x="164" y="170">Острая токсичность</text>
                <text className="mm-card-item" x="164" y="194">Субхроническая токсичность</text>
                <text className="mm-card-item" x="164" y="218">Хроническая токсичность</text>
                <text className="mm-card-item" x="164" y="242">Генотоксичность</text>
            </g>

            <g className="mm-branch">
                <path d="M 700 425 C 620 405 580 360 520 350" stroke="url(#g-safety)" strokeWidth="2.5"/>
                <rect x="140" y="276" width="380" height="140" rx="18" fill="#fff" stroke="#E91E63" strokeWidth="2"/>
                <rect x="140" y="276" width="380" height="48" rx="18" fill="#E91E63"/><rect x="140" y="294" width="380" height="30" fill="#E91E63"/>
                <path d="M 140 324 H 520" stroke="#E91E63" strokeWidth="2"/>
                <text className="mm-pill" x="330" y="301" textAnchor="middle" dominantBaseline="central" fill="#fff">Фармакобезопасность</text>
                <text className="mm-card-item" x="164" y="348">Сердечно-сосудистая система</text>
                <text className="mm-card-item" x="164" y="376">Дыхательная система</text>
                <text className="mm-card-item" x="164" y="404">Центральная нервная система</text>
            </g>

            <a href="/immunogennost-aktivnost" aria-label="Иммуноактивность">
            <g className="mm-branch mm-link">
                <path d="M 700 440 C 620 460 580 510 520 510" stroke="url(#g-immuno)" strokeWidth="2.5"/>
                <rect x="140" y="436" width="380" height="140" rx="18" fill="#fff" stroke="#00BCD4" strokeWidth="2"/>
                <rect x="140" y="436" width="380" height="48" rx="18" fill="#00BCD4"/><rect x="140" y="454" width="380" height="30" fill="#00BCD4"/>
                <path d="M 140 484 H 520" stroke="#00BCD4" strokeWidth="2"/>
                <text className="mm-pill" x="330" y="461" textAnchor="middle" dominantBaseline="central" fill="#fff">Иммуноактивность</text>
                <text className="mm-card-item" x="164" y="508">Оценка иммуноактивности</text>
                <text className="mm-card-item" x="164" y="536">Биологическая активность</text>
                <text className="mm-card-item" x="164" y="564">Механизмы действия</text>
            </g>
            </a>

            <g className="mm-branch">
                <path d="M 700 445 C 620 530 580 660 520 680" stroke="url(#g-bio)" strokeWidth="2.5"/>
                <a href="/farmacevticheskaya-razrabotka" aria-label="Фармразработка">
                    <rect x="140" y="596" width="380" height="160" rx="18" fill="#fff" stroke="#03A9F4" strokeWidth="2"/>
                    <rect x="140" y="596" width="380" height="46" rx="18" fill="#03A9F4"/><rect x="140" y="614" width="380" height="28" fill="#03A9F4"/>
                    <path d="M 140 642 H 520" stroke="#03A9F4" strokeWidth="2"/>
                    <text className="mm-pill mm-link" x="330" y="620" textAnchor="middle" dominantBaseline="central" fill="#fff">Фармразработка</text>
                    <text className="mm-card-item mm-card-item-lg" x="164" y="668">Технологии кинетики анализа</text>
                    <text className="mm-card-item mm-card-item-lg" x="164" y="692">лекарственных средств</text>
                    <text className="mm-card-item mm-card-item-lg" x="164" y="720">Фармакокинетика, иммуногенность /</text>
                    <text className="mm-card-item mm-card-item-lg" x="164" y="744">иммуноактивность</text>
                </a>
            </g>

            {/* RIGHT — у всех групп текст начинается с x=1410, кривые заканчиваются в x=1400 */}
            <g className="mm-branch">
                <path d="M 820 420 C 920 380 965 200 1020 200" stroke="url(#g-pharm)" strokeWidth="2.5"/>
                <rect x="1020" y="100" width="380" height="156" rx="18" fill="#fff" stroke="#146FA8" strokeWidth="2"/>
                <rect x="1020" y="100" width="380" height="44" rx="18" fill="#146FA8"/><rect x="1020" y="118" width="380" height="26" fill="#146FA8"/>
                <path d="M 1020 144 H 1400" stroke="#146FA8" strokeWidth="2"/>
                <text className="mm-pill" x="1210" y="123" textAnchor="middle" dominantBaseline="central" fill="#fff">Фармакология</text>
                <text className="mm-card-item" x="1044" y="170">Специфическая активность</text>
                <text className="mm-card-item" x="1044" y="194">Дозозависимые эффекты</text>
                <text className="mm-card-item" x="1044" y="218">Безопасность</text>
                <text className="mm-card-item" x="1044" y="242">Фармакодинамика</text>
            </g>

            <a href="/farmakokinetika" aria-label="Фармакокинетика">
            <g className="mm-branch mm-link">
                <path d="M 820 425 C 900 405 940 360 1020 350" stroke="url(#g-pk)" strokeWidth="2.5"/>
                <rect x="1020" y="276" width="380" height="140" rx="18" fill="#fff" stroke="#14B7E0" strokeWidth="2"/>
                <rect x="1020" y="276" width="380" height="48" rx="18" fill="#14B7E0"/><rect x="1020" y="294" width="380" height="30" fill="#14B7E0"/>
                <path d="M 1020 324 H 1400" stroke="#14B7E0" strokeWidth="2"/>
                <text className="mm-pill" x="1210" y="301" textAnchor="middle" dominantBaseline="central" fill="#fff">Фармакокинетика</text>
                <text className="mm-card-item" x="1044" y="348">ADME-исследования</text>
                <text className="mm-card-item" x="1044" y="376">Биодоступность</text>
                <text className="mm-card-item" x="1044" y="404">Распределение и метаболизм</text>
            </g>
            </a>

            <g className="mm-branch">
                <path d="M 820 440 C 900 460 940 500 1020 510" stroke="url(#g-repro)" strokeWidth="2.5"/>
                <rect x="1020" y="436" width="380" height="140" rx="18" fill="#fff" stroke="#9C27B0" strokeWidth="2"/>
                <rect x="1020" y="436" width="380" height="48" rx="18" fill="#9C27B0"/><rect x="1020" y="454" width="380" height="30" fill="#9C27B0"/>
                <path d="M 1020 484 H 1400" stroke="#9C27B0" strokeWidth="2"/>
                <text className="mm-pill" x="1210" y="461" textAnchor="middle" dominantBaseline="central" fill="#fff">Репродуктивная токсичность</text>
                <text className="mm-card-item" x="1044" y="508">Фертильность</text>
                <text className="mm-card-item" x="1044" y="536">Эмбриофетальное развитие</text>
                <text className="mm-card-item" x="1044" y="564">Постнатальное развитие</text>
            </g>

            <g className="mm-branch">
                <path d="M 820 445 C 900 530 940 660 1020 680" stroke="url(#g-onco)" strokeWidth="2.5"/>
                <rect x="1020" y="596" width="380" height="160" rx="18" fill="#fff" stroke="#FF9800" strokeWidth="2"/>
                <rect x="1020" y="596" width="380" height="46" rx="18" fill="#FF9800"/><rect x="1020" y="614" width="380" height="28" fill="#FF9800"/>
                <path d="M 1020 642 H 1400" stroke="#FF9800" strokeWidth="2"/>
                <text className="mm-pill" x="1210" y="620" textAnchor="middle" dominantBaseline="central" fill="#fff">Канцерогенность</text>
                <text className="mm-card-item" x="1044" y="668">Исследования in vivo</text>
                <text className="mm-card-item" x="1044" y="696">Исследования in vitro</text>
                <text className="mm-card-item" x="1044" y="724">Долгосрочные исследования</text>
            </g>

            {/* Центр */}
            <g>
                <rect x="680" y="395" width="160" height="70" rx="35" fill="#fff" stroke="#F28F20" strokeWidth="2.5"/>
                <text x="760" y="423" textAnchor="middle" dominantBaseline="central" fill="#F28F20" fontSize="20" fontWeight="700" fontFamily="system-ui">ДОМ</text>
                <text x="760" y="447" textAnchor="middle" dominantBaseline="central" fill="#F28F20" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="0.05em">ФАРМАЦИИ</text>
            </g>
        </svg>
    )
}

const CIRCLE_POSITIONS = [
    { x: 300, y: 125 }, { x: 644, y: 45 }, { x: 987, y: 125 }, { x: 1050, y: 395 },
    { x: 987, y: 650 }, { x: 644, y: 730 }, { x: 300, y: 650 }, { x: 237, y: 395 },
]
const CIRCLE_CARD_HEIGHTS = [145, 125, 125, 145, 145, 125, 125, 125]

function CircleMapSVG() {
    const centerX = 800
    const centerY = 480
    // The side layout uses a 1940-unit-wide viewBox; scale dimensions to this
    // 1600-unit viewBox so both variants render at the same on-screen size.
    const cardWidth = 313

    return (
        <svg viewBox="0 0 1600 880" preserveAspectRatio="xMidYMid meet" className="mm-svg" aria-label="Направления доклинических исследований по окружности">
            {BRANCHES.map((branch, index) => {
                const position = CIRCLE_POSITIONS[index]
                const cardHeight = CIRCLE_CARD_HEIGHTS[index]
                const targetX = position.x + cardWidth / 2
                const targetY = position.y + cardHeight / 2
                return <line key={branch.id} x1={centerX} y1={centerY} x2={targetX} y2={targetY} stroke={branch.color} strokeWidth="3" strokeLinecap="round" />
            })}

            {BRANCHES.map((branch, index) => {
                const position = CIRCLE_POSITIONS[index]
                const cardHeight = CIRCLE_CARD_HEIGHTS[index]
                return (
                    <foreignObject key={branch.id} x={position.x} y={position.y} width={cardWidth} height={cardHeight}>
                        <div className="circle-card" style={{ borderColor: branch.color }}>
                            {branch.href ? <a href={branch.href} className="circle-card__title" style={{ backgroundColor: branch.color }}>{branch.title}</a> : <div className="circle-card__title" style={{ backgroundColor: branch.color }}>{branch.title}</div>}
                            <div className="circle-card__body">
                                {branch.items.map((item) => <div key={item.title}>{item.title}</div>)}
                            </div>
                        </div>
                    </foreignObject>
                )
            })}

            <g>
                <rect x={centerX - 80} y={centerY - 35} width="160" height="70" rx="35" fill="#fff" stroke="#F28F20" strokeWidth="2.5" />
                <text x={centerX} y={centerY - 7} textAnchor="middle" dominantBaseline="central" fill="#F28F20" fontSize="20" fontWeight="700" fontFamily="system-ui">ДОМ</text>
                <text x={centerX} y={centerY + 17} textAnchor="middle" dominantBaseline="central" fill="#F28F20" fontSize="13" fontWeight="600" fontFamily="system-ui" letterSpacing="0.05em">ФАРМАЦИИ</text>
            </g>
        </svg>
    )
}

export default function DoklinicheskieIssledovaniya() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const t = translations[lang]

    return (
        <div className="min-h-screen bg-white">
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            {/* Header — как на других страницах */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F28F20]/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 h-full">
                            <img src="/logo/logo-vector.png" alt="АО НПО «ДОМ ФАРМАЦИИ»" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className="hidden md:flex border-l-2 border-[#F28F20]/30 pl-4 h-12 items-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">НПО «ДОМ ФАРМАЦИИ»</h1>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md hover:shadow-lg">Заявка на доклинические исследования</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md hover:shadow-lg">Заявка на НИР</Link>
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
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[70vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинические исследования</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-center font-medium rounded-lg transition-all">Заявка на НИР</Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Breadcrumbs */}
            <div className="bg-white border-b border-[#F28F20]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">Доклинические исследования</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="pt-8 sm:pt-12 pb-2 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-500 hover:text-[#F28F20] hover:border-[#F28F20]/40 transition-all mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        На главную
                    </Link>
                    <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">Доклинические исследования</h1>
                    <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Полный цикл исследований лекарственных средств — от токсикологии до фармакокинетики</p>
                </div>
            </section>

            {/* Основные направления */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    <div className="group relative min-h-64 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col border border-gray-100 hover:border-[#F28F20]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        <svg className="w-12 h-12 text-[#F28F20] mb-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F28F20] transition-colors">Фармакологические исследования</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">Изучение специфической активности, фармакодинамики, дозозависимых эффектов и безопасности лекарственных средств.</p>
                        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F28F20]">Подробнее <span aria-hidden="true">→</span></span>
                    </div>

                    <div className="group relative min-h-64 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col border border-gray-100 hover:border-[#14B7E0]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        <svg className="w-12 h-12 text-[#14B7E0] mb-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#14B7E0] transition-colors">Токсикология</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">Исследования острой, субхронической и хронической токсичности, генотоксичности и фармакологической безопасности.</p>
                        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#14B7E0]">Подробнее <span aria-hidden="true">→</span></span>
                    </div>

                    <Link href="/farmakokinetika" className="group relative min-h-64 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col border border-gray-100 hover:border-[#146FA8]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        <svg className="w-12 h-12 text-[#146FA8] mb-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#146FA8] transition-colors">Фармакокинетика</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">ADME-исследования, оценка биодоступности, распределения, метаболизма и выведения лекарственных средств.</p>
                        <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#146FA8]">Подробнее <span aria-hidden="true">→</span></span>
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 pb-16 sm:pb-24">
                <div className="bg-gradient-to-r from-[#F28F20]/10 to-[#14B7E0]/10 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Готовы начать исследование?</h3>
                    <p className="text-sm text-gray-600 mb-4">Оставьте заявку и наши специалисты свяжутся с вами</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/zayavka-doklinicheskie" className="px-6 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg text-sm">Заявка на доклинические исследования</Link>
                        <Link href="/zayavka-nir" className="px-6 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg text-sm">Заявка на НИР</Link>
                    </div>
                </div>
            </section>

            {/* Footer — как на других страницах */}
            <SiteFooter lang={lang} />

            <ScrollToTop />
        </div>
    )
}

const CSS = `
.mm-svg{width:100%;height:auto;display:block}
.mm-svg path{fill:none;stroke-linecap:round}
.mm-branch{transition:opacity 0.15s;cursor:default}
.mm-link{cursor:pointer}
.mm-pill{font-size:20px;font-weight:600;font-family:system-ui,sans-serif}
.mm-sub{font-size:19px;font-weight:400;fill:#4a4a4a;font-family:system-ui,sans-serif}
.mm-card-item{font-size:19px;font-weight:400;fill:#111827;font-family:system-ui,sans-serif}
.mm-card-item-lg{font-size:19px}
.circle-card{box-sizing:border-box;height:100%;overflow:hidden;border:2px solid;border-radius:18px;background:#fff;box-shadow:0 8px 22px rgba(15,23,42,.12);font-family:system-ui,sans-serif}
.circle-card__title{display:block;padding:8px 13px;text-align:center;color:#fff;font-size:16.5px;font-weight:700;line-height:1.2;text-decoration:none}
.circle-card__body{display:grid;gap:4px;padding:7px 15px;color:#111827;font-size:15.7px;line-height:1.22}
`
