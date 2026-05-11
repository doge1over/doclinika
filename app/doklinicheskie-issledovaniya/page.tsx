'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'

function MindMapSVG({ active, setActive }: { active: string | null; setActive: (id: string | null) => void }) {
    const dim = (id: string) => active !== null && active !== id ? 'mm-dim' : ''
    return (
        <svg viewBox="-160 0 1760 880" preserveAspectRatio="xMidYMid meet" className="mm-svg" onMouseLeave={() => setActive(null)}>
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
            <g className={`mm-branch ${dim('tox')}`} onMouseEnter={() => setActive('tox')}>
                <path d="M 700 420 C 600 380 560 230 500 200" stroke="url(#g-tox)" strokeWidth="2.5"/>
                <rect x="330" y="175" width="170" height="50" rx="25" fill="#fff" stroke="#F28F20" strokeWidth="2"/>
                <text className="mm-pill" x="415" y="202" textAnchor="middle" dominantBaseline="central" fill="#F28F20">Токсикология</text>
                <path d="M 330 200 L 260 200" stroke="#F28F20" strokeWidth="2"/>
                <path d="M 260 200 C 220 193 170 90 90 80" stroke="#F28F20" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="80" y="80" textAnchor="end" dominantBaseline="central">Острая токсичность</text>
                <path d="M 260 200 C 210 196 150 145 70 140" stroke="#F28F20" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="140" textAnchor="end" dominantBaseline="central">Субхроническая токсичность</text>
                <path d="M 260 200 C 210 207 150 255 70 260" stroke="#F28F20" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="260" textAnchor="end" dominantBaseline="central">Хроническая токсичность</text>
                <path d="M 260 200 C 210 212 150 315 70 320" stroke="#F28F20" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="320" textAnchor="end" dominantBaseline="central">Генотоксичность</text>
            </g>

            <g className={`mm-branch ${dim('safety')}`} onMouseEnter={() => setActive('safety')}>
                <path d="M 700 425 C 620 405 580 360 500 350" stroke="url(#g-safety)" strokeWidth="2.5"/>
                <rect x="270" y="325" width="230" height="50" rx="25" fill="#fff" stroke="#E91E63" strokeWidth="2"/>
                <text className="mm-pill" x="385" y="352" textAnchor="middle" dominantBaseline="central" fill="#E91E63">Фармакобезопасность</text>
                <path d="M 270 350 L 260 350" stroke="#E91E63" strokeWidth="2"/>
                <path d="M 260 350 C 210 343 150 385 70 380" stroke="#E91E63" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="380" textAnchor="end" dominantBaseline="central">Сердечно-сосудистая система</text>
                <path d="M 260 350 C 210 357 150 425 70 430" stroke="#E91E63" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="430" textAnchor="end" dominantBaseline="central">Дыхательная система</text>
                <path d="M 260 350 C 210 362 150 472 70 480" stroke="#E91E63" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="480" textAnchor="end" dominantBaseline="central">Центральная нервная система</text>
            </g>

            <g className={`mm-branch ${dim('immuno')}`} onMouseEnter={() => setActive('immuno')}>
                <path d="M 700 440 C 620 460 580 500 500 510" stroke="url(#g-immuno)" strokeWidth="2.5"/>
                <rect x="340" y="485" width="160" height="50" rx="25" fill="#fff" stroke="#00BCD4" strokeWidth="2"/>
                <text className="mm-pill" x="420" y="512" textAnchor="middle" dominantBaseline="central" fill="#00BCD4">Иммунология</text>
                <path d="M 340 510 L 260 510" stroke="#00BCD4" strokeWidth="2"/>
                <path d="M 260 510 C 210 503 150 545 70 540" stroke="#00BCD4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="540" textAnchor="end" dominantBaseline="central">Иммуногенность</text>
                <path d="M 260 510 C 210 518 150 580 70 585" stroke="#00BCD4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="585" textAnchor="end" dominantBaseline="central">Иммунотоксикология</text>
                <path d="M 260 510 C 210 523 150 622 70 630" stroke="#00BCD4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="630" textAnchor="end" dominantBaseline="central">Аллергенность</text>
            </g>

            <g className={`mm-branch ${dim('bio')}`} onMouseEnter={() => setActive('bio')}>
                <path d="M 700 445 C 620 530 580 660 500 680" stroke="url(#g-bio)" strokeWidth="2.5"/>
                <rect x="360" y="655" width="140" height="50" rx="25" fill="#fff" stroke="#03A9F4" strokeWidth="2"/>
                <text className="mm-pill" x="430" y="682" textAnchor="middle" dominantBaseline="central" fill="#03A9F4">Биоанализ</text>
                <path d="M 360 680 L 260 680" stroke="#03A9F4" strokeWidth="2"/>
                <path d="M 260 680 C 210 677 150 705 70 705" stroke="#03A9F4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="705" textAnchor="end" dominantBaseline="central">Разработка методик</text>
                <path d="M 260 680 C 210 687 150 745 70 750" stroke="#03A9F4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="750" textAnchor="end" dominantBaseline="central">Валидация методик</text>
                <path d="M 260 680 C 210 693 150 788 70 795" stroke="#03A9F4" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="60" y="795" textAnchor="end" dominantBaseline="central">Биоматрицы</text>
            </g>

            {/* RIGHT */}
            <g className={`mm-branch ${dim('pharm')}`} onMouseEnter={() => setActive('pharm')}>
                <path d="M 820 420 C 920 380 960 230 1020 200" stroke="url(#g-pharm)" strokeWidth="2.5"/>
                <rect x="1020" y="175" width="170" height="50" rx="25" fill="#fff" stroke="#146FA8" strokeWidth="2"/>
                <text className="mm-pill" x="1105" y="202" textAnchor="middle" dominantBaseline="central" fill="#146FA8">Фармакология</text>
                <path d="M 1190 200 L 1250 200" stroke="#146FA8" strokeWidth="2"/>
                <path d="M 1250 200 C 1280 193 1310 100 1340 90" stroke="#146FA8" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="90" textAnchor="start" dominantBaseline="central">Специфическая активность</text>
                <path d="M 1250 200 C 1280 196 1320 150 1340 145" stroke="#146FA8" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="145" textAnchor="start" dominantBaseline="central">Дозозависимые эффекты</text>
                <path d="M 1250 200 C 1280 207 1320 252 1340 258" stroke="#146FA8" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="258" textAnchor="start" dominantBaseline="central">Безопасность</text>
                <path d="M 1250 200 C 1280 215 1320 310 1340 318" stroke="#146FA8" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="318" textAnchor="start" dominantBaseline="central">Фармакодинамика</text>
            </g>

            <g className={`mm-branch ${dim('pk')}`} onMouseEnter={() => setActive('pk')}>
                <path d="M 820 425 C 900 405 940 360 1020 350" stroke="url(#g-pk)" strokeWidth="2.5"/>
                <rect x="1020" y="325" width="195" height="50" rx="25" fill="#fff" stroke="#14B7E0" strokeWidth="2"/>
                <text className="mm-pill" x="1117" y="352" textAnchor="middle" dominantBaseline="central" fill="#14B7E0">Фармакокинетика</text>
                <path d="M 1215 350 L 1260 350" stroke="#14B7E0" strokeWidth="2"/>
                <path d="M 1260 350 C 1290 343 1320 383 1340 380" stroke="#14B7E0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="380" textAnchor="start" dominantBaseline="central">ADME-исследования</text>
                <path d="M 1260 350 C 1290 357 1320 422 1340 425" stroke="#14B7E0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="425" textAnchor="start" dominantBaseline="central">Биодоступность</text>
                <path d="M 1260 350 C 1290 362 1320 470 1340 475" stroke="#14B7E0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="475" textAnchor="start" dominantBaseline="central">Распределение и метаболизм</text>
            </g>

            <g className={`mm-branch ${dim('repro')}`} onMouseEnter={() => setActive('repro')}>
                <path d="M 820 440 C 900 460 940 500 1020 510" stroke="url(#g-repro)" strokeWidth="2.5"/>
                <rect x="1020" y="485" width="290" height="50" rx="25" fill="#fff" stroke="#9C27B0" strokeWidth="2"/>
                <text className="mm-pill" x="1165" y="512" textAnchor="middle" dominantBaseline="central" fill="#9C27B0">Репродуктивная токсичность</text>
                <path d="M 1310 510 L 1350 510" stroke="#9C27B0" strokeWidth="2"/>
                <path d="M 1350 510 C 1370 503 1390 538 1400 535" stroke="#9C27B0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1410" y="535" textAnchor="start" dominantBaseline="central">Фертильность</text>
                <path d="M 1350 510 C 1370 518 1390 575 1400 578" stroke="#9C27B0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1410" y="578" textAnchor="start" dominantBaseline="central">Эмбриофетальное развитие</text>
                <path d="M 1350 510 C 1370 523 1390 620 1400 625" stroke="#9C27B0" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1410" y="625" textAnchor="start" dominantBaseline="central">Постнатальное развитие</text>
            </g>

            <g className={`mm-branch ${dim('onco')}`} onMouseEnter={() => setActive('onco')}>
                <path d="M 820 445 C 900 530 940 660 1020 680" stroke="url(#g-onco)" strokeWidth="2.5"/>
                <rect x="1020" y="655" width="195" height="50" rx="25" fill="#fff" stroke="#FF9800" strokeWidth="2"/>
                <text className="mm-pill" x="1117" y="682" textAnchor="middle" dominantBaseline="central" fill="#FF9800">Канцерогенность</text>
                <path d="M 1215 680 L 1260 680" stroke="#FF9800" strokeWidth="2"/>
                <path d="M 1260 680 C 1290 677 1320 700 1340 698" stroke="#FF9800" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="698" textAnchor="start" dominantBaseline="central">Исследования in vivo</text>
                <path d="M 1260 680 C 1290 687 1320 738 1340 740" stroke="#FF9800" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="740" textAnchor="start" dominantBaseline="central">Исследования in vitro</text>
                <path d="M 1260 680 C 1290 693 1320 778 1340 783" stroke="#FF9800" strokeWidth="1.5" opacity="0.85"/>
                <text className="mm-sub" x="1350" y="783" textAnchor="start" dominantBaseline="central">Долгосрочные исследования</text>
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

export default function DoklinicheskieIssledovaniya() {
    const [lang, setLang] = useState<Language>('ru')
    const [active, setActive] = useState<string | null>(null)
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
                    <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto">Полный цикл исследований лекарственных средств — от токсикологии до биоанализа</p>
                </div>
            </section>

            {/* Mind Map */}
            <section className="max-w-[1500px] mx-auto px-4 py-8">
                <MindMapSVG active={active} setActive={setActive} />
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
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerInfo}</h3>
                            <ul className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                                <li><Link href="/o-nas" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full"></span>{t.footerAbout}</Link></li>
                                <li><Link href="/category/news" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full"></span>{t.footerNews}</Link></li>
                                <li><Link href="/kontakty" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full"></span>{t.footerContacts}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerOurContacts}</h3>
                            <div className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                                <p className="flex items-center gap-3"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><a href={`tel:${t.phone}`} className="hover:text-[#F28F20] transition font-medium">{t.phone}</a></p>
                                <p className="flex items-center gap-3"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><a href={`mailto:${t.email}`} className="hover:text-[#F28F20] transition break-all">{t.email}</a></p>
                                <p className="flex items-start gap-3"><svg className="w-4 h-4 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>188663, Россия, Ленинградская область,<br/>Всеволожский район, г.п. Кузьмоловский,<br/>Заводская улица, 3-245</span></p>
                            </div>
                        </div>
                        <div className="sm:col-span-2 md:col-span-1">
                            <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerHowToGet}</h3>
                            <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Adc7b04b68a41ad1bdf18c8112ff573806757e0f708dfd54378d8ba4859993f58" width="100%" height="180" frameBorder="0" allowFullScreen={true} className="rounded-xl sm:rounded-2xl shadow-lg" title="Карта" />
                        </div>
                    </div>
                    <div className="pt-6 sm:pt-8 border-t border-gray-700 text-center text-xs sm:text-sm text-gray-400">
                        <p className="font-medium">{t.footerCopyright}</p>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    )
}

const CSS = `
.mm-svg{width:100%;height:auto;display:block}
.mm-svg path{fill:none;stroke-linecap:round}
.mm-branch{transition:opacity 0.3s;cursor:default}
.mm-dim{opacity:0.18}
.mm-pill{font-size:17px;font-weight:600;font-family:system-ui,sans-serif}
.mm-sub{font-size:15px;font-weight:400;fill:#4a4a4a;font-family:system-ui,sans-serif}
`