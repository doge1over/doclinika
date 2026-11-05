'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { useManagedSection } from '@/lib/useManagedSection'

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },
    { href: '/immunogennost-aktivnost', title: 'Иммуноактивность' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Отдел гистологии и патоморфологии' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },
    { href: '/farmacevticheskaya-razrabotka', title: 'Фармацевтическая разработка' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Отдел лабораторной диагностики' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/farmakokinetika', title: 'Фармакокинетика' },
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики', active: true },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const policies = [
    {
        title: 'Политика по использованию лабораторных животных',
        url: 'https://doclinika.ru/wp-content/uploads/2020/01/Politika-po-ispol-zovaniya-laboratorny-h-zhivotny-h.pdf'
    },
    {
        title: 'Политика в области качества',
        url: 'https://doclinika.ru/wp-content/uploads/2020/05/Politika-v-oblasti-kachestva_2020.pdf'
    },
    {
        title: 'Политика информационной и физической безопасности',
        url: 'https://doclinika.ru/wp-content/uploads/2020/01/Politika-informatsionnoj-i-fizicheskoj-bezopasnosti.pdf'
    },
    {
        title: 'Экологическая политика',
        url: 'https://doclinika.ru/wp-content/uploads/2020/01/E-kologicheskaya-politika.pdf'
    },
    {
        title: 'Экономическая политика',
        url: 'https://doclinika.ru/wp-content/uploads/2020/01/E-konomicheskaya-politika.pdf'
    },
    {
        title: 'Политика в области охраны труда',
        url: 'https://doclinika.ru/wp-content/uploads/2020/02/Politika-v-oblasti-ohrany-truda.pdf'
    }
]

const laborProtectionDocs = [
    {
        title: 'Сводная ведомость результатов проведения специальной оценки',
        url: 'https://doclinika.ru/wp-content/uploads/2022/01/Svodnaya-vedomost.pdf'
    },
    {
        title: 'Перечень рекомендуемых мероприятий по улучшению условий труда',
        url: 'https://doclinika.ru/wp-content/uploads/2022/01/Perechen-rekomenduemyh-meropriyatij-po-uluchsheniju-uslovij-truda-1.pdf'
    },
    {
        title: 'Сводная ведомость результатов проведения специальной оценки 03.2022',
        url: 'https://doclinika.ru/wp-content/uploads/2022/04/Svodnaya-vedomost-SOUT-03.22.pdf'
    },
    {
        title: 'Перечень рекомендуемых мероприятий по улучшению условий труда 03.2022',
        url: 'https://doclinika.ru/wp-content/uploads/2022/04/Perechen-rekomenduemyh-meropriyatij-03.22.pdf'
    },
    {
        title: 'Карты оценки рисков для опасностей 06.2022',
        url: 'https://doclinika.ru/wp-content/uploads/2022/09/Karty-ocenki-riskov-dlya-opasnostej_2022.pdf'
    },
    {
        title: 'Сводная ведомость коэффициентов эффективности мер снижения профессиональных рисков 06.2022',
        url: 'https://doclinika.ru/wp-content/uploads/2022/09/Svodnaya-vedomomost-koefficientov-effektivnosti-mer-snizheniya-professionalnyh-riskov_2022.pdf'
    },
    {
        title: 'Сводная ведомость результатов проведения специальной оценки 02.2023',
        url: 'https://doclinika.ru/wp-content/uploads/2023/02/Svodnaya-vedomost-rezultatov-provedeniya-specialnoj-ocenki-02.2023.pdf'
    },
    {
        title: 'Перечень рекомендуемых мероприятий по улучшению условий труда 02.2023',
        url: 'https://doclinika.ru/wp-content/uploads/2023/02/Perechen-rekomenduemyh-meropriyatij-po-uluchsheniju-uslovij-truda-02.2023.pdf'
    },
    {
        title: 'Сводная ведомость результатов проведения специальной оценки 03.2025',
        url: 'https://doclinika.ru/wp-content/uploads/2025/03/Svodnaya-vedomost-rezultatov-provedeniya-specialnoj-ocenki-03.2025.pdf'
    },
    {
        title: 'Перечень рекомендуемых мероприятий по улучшению условий труда 03.2025',
        url: 'https://doclinika.ru/wp-content/uploads/2025/03/Perechen-rekomenduemyh-meropriyatij-po-uluchsheniju-uslovij-truda-03.2025-.pdf'
    }
]

export default function Policy() {
    const managed = useManagedSection<{title:string;url:string;_group?:string}>('documents', [
        ...policies.map(x=>({...x,_group:'policies'})), ...laborProtectionDocs.map(x=>({...x,_group:'laborProtectionDocs'}))
    ])
    const managedPolicies = managed.filter(x=>x._group==='policies')
    const managedLaborDocs = managed.filter(x=>x._group==='laborProtectionDocs')
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [laborOpen, setLaborOpen] = useState(true)
    const t = translations[lang]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
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
                                {mobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[70vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинические исследования</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-center font-medium rounded-lg transition-all">Заявка на НИР</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Главная</Link>
                            <Link href="/o-nas" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Контакты</Link>
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
                        <span className="text-gray-900 font-medium">Политики</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                    {/* Mobile Sidebar Toggle */}
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200">
                            <span className="font-semibold text-gray-900">Меню раздела</span>
                            <svg className={`w-5 h-5 text-gray-500 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {sidebarOpen && (
                            <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                                <nav className="py-2">
                                    {menuItems.map((item, index) => (
                                        item.external ? (
                                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>
                                        ) : (
                                            <Link key={index} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>
                                        )
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-5 py-4" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h3 className="text-white font-bold">Меню</h3>
                            </div>
                            <nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {menuItems.map((item, index) => (
                                    item.external ? (
                                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>
                                    ) : (
                                        <Link key={index} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>
                                    )
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            {/* Header */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Политики</h1>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8">
                                {/* Основные политики */}
                                <div className="space-y-4 mb-8">
                                    {managedPolicies.map((policy, index) => (
                                        <a
                                            key={index}
                                            href={policy.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#F28F20]/50 hover:bg-[#F28F20]/5 transition group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-[#F28F20]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F28F20]/20 transition">
                                                <svg className="w-5 h-5 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 group-hover:text-[#F28F20] transition leading-relaxed">
                                                {policy.title}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                {/* Аккордеон: Охрана труда */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setLaborOpen(!laborOpen)}
                                        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 transition text-left"
                                    >
                                        <span className="font-semibold text-gray-900">Охрана труда:</span>
                                        <svg className={`w-5 h-5 text-[#F28F20] transition-transform ${laborOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {laborOpen && (
                                        <div className="px-5 py-4 bg-white border-t border-gray-100">
                                            <p className="text-gray-900 font-medium mb-4">АО "НПО "ДОМ ФАРМАЦИИ"</p>
                                            <div className="space-y-4">
                                                {managedLaborDocs.map((doc, index) => (
                                                    <a
                                                        key={index}
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#14B7E0]/50 hover:bg-[#14B7E0]/5 transition group"
                                                    >
                                                        <div className="w-10 h-10 rounded-lg bg-[#14B7E0]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#14B7E0]/20 transition">
                                                            <svg className="w-5 h-5 text-[#14B7E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-gray-700 group-hover:text-[#14B7E0] transition leading-relaxed">
                                                            {doc.title}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            {/* Footer */}
            <SiteFooter lang={lang} />

            <ScrollToTop />
        </div>
    )
}
