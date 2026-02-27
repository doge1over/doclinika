'use client'

import { useState, useEffect } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },
    { href: '/himiko-analiticheskie-issledovaniya', title: 'Химико-аналитическая лаборатория' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Лаборатория гистологии и патоморфологии' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Лаборатория микробиологии' },
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
    { href: '/glavnaya', title: 'Сведения об образовательной организации', active: true },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

export default function Glavnaya() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [accessibilityMode, setAccessibilityMode] = useState(false)
    const [fontSize, setFontSize] = useState(16)
    const [highContrast, setHighContrast] = useState(false)
    const t = translations[lang]

    // Применяем стили доступности
    useEffect(() => {
        if (accessibilityMode) {
            document.documentElement.style.fontSize = `${fontSize}px`
            if (highContrast) {
                document.body.classList.add('high-contrast')
            } else {
                document.body.classList.remove('high-contrast')
            }
        } else {
            document.documentElement.style.fontSize = '16px'
            document.body.classList.remove('high-contrast')
        }
    }, [accessibilityMode, fontSize, highContrast])

    return (
        <div className={`min-h-screen ${accessibilityMode && highContrast ? 'bg-black text-yellow-300' : 'bg-white'}`}>

            {/* Панель доступности */}
            {accessibilityMode && (
                <div className="bg-gray-900 text-white py-3 px-4">
                    <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="font-medium">Размер шрифта:</span>
                            <button
                                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                            >
                                A-
                            </button>
                            <span>{fontSize}px</span>
                            <button
                                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                            >
                                A+
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setHighContrast(!highContrast)}
                                className={`px-4 py-1 rounded ${highContrast ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {highContrast ? 'Обычный контраст' : 'Высокий контраст'}
                            </button>
                            <button
                                onClick={() => {
                                    setAccessibilityMode(false)
                                    setFontSize(16)
                                    setHighContrast(false)
                                }}
                                className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded"
                            >
                                Выключить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white/95 border-[#F28F20]/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 h-full">
                            <img src="/logo/logo-vector.png" alt="АО НПО ДОМ ФАРМАЦИИ" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className={`hidden md:flex border-l-2 pl-4 h-12 items-center ${accessibilityMode && highContrast ? 'border-yellow-400' : 'border-[#F28F20]/30'}`}>
                                <h1 className={`text-xl font-bold leading-tight ${accessibilityMode && highContrast ? 'text-yellow-300' : 'text-gray-900'}`}>НПО Дом фармации</h1>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md hover:shadow-lg">Заявка на доклинику</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md hover:shadow-lg">Заявка на НИР</Link>
                            </div>
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <div className="text-right">
                                <a href={`tel:${t.phone}`} className={`block text-sm font-semibold transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:text-yellow-100' : 'text-gray-900 hover:text-[#F28F20]'}`}>{t.phone}</a>
                                <a href={`mailto:${t.email}`} className={`block text-xs transition ${accessibilityMode && highContrast ? 'text-yellow-400 hover:text-yellow-200' : 'text-gray-500 hover:text-[#F28F20]'}`}>{t.email}</a>
                            </div>
                        </div>
                        <div className="flex md:hidden items-center gap-2">
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-lg transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10'}`} aria-label="Меню">
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
                    <div className={`md:hidden border-t shadow-lg max-h-[70vh] overflow-y-auto ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-100'}`}>
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинику</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-center font-medium rounded-lg transition-all">Заявка на НИР</Link>
                            <div className={`border-t my-3 ${accessibilityMode && highContrast ? 'border-yellow-400' : 'border-gray-100'}`}></div>
                            <Link href="/" className={`block px-4 py-2 rounded-lg transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>Главная</Link>
                            <Link href="/o-nas" className={`block px-4 py-2 rounded-lg transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>О нас</Link>
                            <Link href="/kontakty" className={`block px-4 py-2 rounded-lg transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>Контакты</Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Breadcrumbs */}
            <div className={`border-b ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white border-[#F28F20]/20'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className={`flex items-center text-sm ${accessibilityMode && highContrast ? 'text-yellow-400' : 'text-gray-500'}`}>
                        <Link href="/" className={`transition ${accessibilityMode && highContrast ? 'hover:text-yellow-200' : 'hover:text-[#F28F20]'}`}>Главная</Link>
                        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className={`font-medium ${accessibilityMode && highContrast ? 'text-yellow-300' : 'text-gray-900'}`}>Сведения об образовательной организации</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                    {/* Mobile Sidebar Toggle */}
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl shadow-md border ${accessibilityMode && highContrast ? 'bg-black border-yellow-400 text-yellow-300' : 'bg-white border-gray-200'}`}>
                            <span className="font-semibold">Меню раздела</span>
                            <svg className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {sidebarOpen && (
                            <div className={`mt-3 rounded-xl shadow-md border overflow-hidden ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                                <nav className="py-2">
                                    {menuItems.map((item, index) => (
                                        item.external ? (
                                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className={`block px-4 py-2.5 text-sm transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</a>
                                        ) : (
                                            <Link key={index} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active ? (accessibilityMode && highContrast ? 'bg-yellow-900 text-yellow-300 font-medium border-l-4 border-yellow-400' : 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]') : (accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]')}`}>{item.title}</Link>
                                        )
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className={`sticky top-24 rounded-2xl shadow-lg border overflow-hidden ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                            <div className="px-5 py-4" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h3 className="text-white font-bold">Меню</h3>
                            </div>
                            <nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {menuItems.map((item, index) => (
                                    item.external ? (
                                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className={`block px-5 py-2.5 text-sm transition ${accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</a>
                                    ) : (
                                        <Link key={index} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active ? (accessibilityMode && highContrast ? 'bg-yellow-900 text-yellow-300 font-medium border-l-4 border-yellow-400' : 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]') : (accessibilityMode && highContrast ? 'text-yellow-300 hover:bg-yellow-900' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]')}`}>{item.title}</Link>
                                    )
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="flex-1 min-w-0">
                        <div className={`rounded-2xl shadow-lg border overflow-hidden ${accessibilityMode && highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
                            {/* Header */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Сведения об образовательной организации</h1>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

                                {/* Приветствие */}
                                <div className="text-center space-y-2">
                                    <h2 className={`text-xl sm:text-2xl font-bold ${accessibilityMode && highContrast ? 'text-yellow-300' : 'text-gray-900'}`}>Уважаемые коллеги!</h2>
                                    <p className={`text-lg ${accessibilityMode && highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Предлагаем Вам <strong className="text-[#F28F20]">программы</strong> для обучения:</p>
                                </div>

                                {/* Программы */}
                                <div className={`text-center space-y-6 ${accessibilityMode && highContrast ? 'text-yellow-300' : 'text-gray-700'}`}>

                                    {/* Программа 1 */}
                                    <div className="space-y-1">
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2026/01/Programma_perepodgotovka-dlya-sajta-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">
                                                Программа профессиональной переподготовки
                                            </a>
                                            {' '}(540 часов)
                                        </p>
                                        <p className={`font-semibold ${accessibilityMode && highContrast ? 'text-yellow-200' : 'text-gray-900'}`}>
                                            «Токсикология и фармакология для специалиста<br />
                                            в области надлежащей лабораторной практики (GLP)»
                                        </p>
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2024/03/Dogovor-oferta-perepodgotovka-2024-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline font-semibold">
                                                ДОГОВОР-ОФЕРТА
                                            </a>
                                            {' '}по программе профессиональной переподготовки
                                        </p>
                                    </div>

                                    {/* Программа 2 */}
                                    <div className="space-y-1">
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2025/12/Programma-Specialist-dlya-sajta-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">
                                                Программа повышения квалификации на 2026 год
                                            </a>
                                            {' '}(122 часа)
                                        </p>
                                        <p className={`font-semibold ${accessibilityMode && highContrast ? 'text-yellow-200' : 'text-gray-900'}`}>
                                            «Специалист в области исследований лекарственных средств<br />
                                            в соответствии с надлежащей лабораторной практикой (GLP)»
                                        </p>
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2024/03/Dogovor-oferta-kurs-soglasovannyj.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline font-semibold">
                                                ДОГОВОР-ОФЕРТА
                                            </a>
                                            {' '}по программе повышения квалификации
                                        </p>
                                    </div>

                                    {/* Программа 3 */}
                                    <div className="space-y-1">
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2025/12/Programma-Auditor-dlya-sajta.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">
                                                Программа повышения квалификации
                                            </a>
                                            {' '}(42 часа)
                                        </p>
                                        <p className={`font-semibold ${accessibilityMode && highContrast ? 'text-yellow-200' : 'text-gray-900'}`}>
                                            «Аудитор системы менеджмента качества в области<br />
                                            надлежащей лабораторной практики (GLP)»
                                        </p>
                                    </div>

                                    {/* Программа 4 */}
                                    <div className="space-y-1">
                                        <p>
                                            <a href="https://doclinika.ru/wp-content/uploads/2025/12/Programma-ARRIVE-dlya-sajta-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">
                                                Программа повышения квалификации
                                            </a>
                                            {' '}(28 часов)
                                        </p>
                                        <p className={`font-semibold ${accessibilityMode && highContrast ? 'text-yellow-200' : 'text-gray-900'}`}>
                                            «Дизайн эксперимента в соответствии<br />
                                            с принципами ARRIVE»
                                        </p>
                                    </div>

                                </div>

                                {/* Ссылки */}
                                <div className={`rounded-xl p-6 text-center space-y-3 ${accessibilityMode && highContrast ? 'bg-yellow-900/20 border border-yellow-400' : 'bg-gray-50'}`}>
                                    <Link href="/glavnaya/svedeniya-ob-obrazovatelnoj-organizacii" className="block text-lg font-medium text-[#F28F20] hover:underline">
                                        Сведения об образовательной организации
                                    </Link>
                                    <Link href="/glavnaya/kontakty" className="block text-lg font-medium text-[#14B7E0] hover:underline">
                                        Контакты
                                    </Link>
                                </div>

                                {/* Версия для слабовидящих */}
                                <div className={`border-t pt-6 ${accessibilityMode && highContrast ? 'border-yellow-400' : 'border-gray-200'}`}>
                                    <button
                                        onClick={() => setAccessibilityMode(!accessibilityMode)}
                                        className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg ${
                                            accessibilityMode
                                                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                                                : 'bg-[#F28F20] text-white hover:bg-[#e07d10]'
                                        }`}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 576 512">
                                            <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                        </svg>
                                        {accessibilityMode ? 'Выключить версию для слабовидящих' : 'Версия для слабовидящих'}
                                    </button>

                                    {/* Логотипы */}
                                    <div className="flex items-center gap-6 mt-6">
                                        <a href="http://www.obrnadzor.gov.ru/ru/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition">
                                            <img src="/images/Emblem_of_Rosobrnadzor.png" alt="Рособрнадзор" className="h-16 w-auto" />
                                        </a>
                                        <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition">
                                            <img src="/images/Ikonka_Gerb_Polnocvetnoe_vosproizvedenie-973x1024.jpg" alt="Минобрнауки" className="h-16 w-auto" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </article>
                </div>
            </main>

            {/* Footer */}
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
                                <p className="flex items-start gap-3"><svg className="w-4 h-4 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>{t.footerAddress}</span></p>
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