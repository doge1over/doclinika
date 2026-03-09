'use client'

import { useState } from 'react'
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
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества', active: true },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const publications = [
    { authors: 'Ходько С.В., Макарова М.Н., Макаров В.Г.', title: 'Документальное сопровождение доклинического исследования in vivo в соответствии с принципами надлежащей лабораторной практики', journal: 'Регуляторные исследования и экспертиза лекарственных средств. 2025. Т. 15. № 3. С. 252–261', link: 'https://www.vedomostincesmp.ru/jour/article/view/698/1950' },
    { authors: 'Березкин В.А., Бондарева Е.Д., Добрянская С.С., Караваева А.В., Хан С.О., Ходько С.В.', title: 'Технологические процессы в доклинических исследованиях. Риск-ориентированный подход', journal: 'В книге: Консультант GLP-Planet 2022. Мнение фармацевтической отрасли. Санкт-Петербург, 2022. С. 152-173.', link: '' },
    { authors: 'Ходько С.В., Макарова М.Н., Макаров В.Г., Салынов С.С., Родионова Н.В.', title: 'Определение критических фаз экспериментальной части научно-исследовательской работы с использованием лабораторных животных: анализ рисков', journal: 'Ведомости Научного центра экспертизы средств медицинского применения. – 2021, Т. 11(3). – С. 193-201', link: '' },
    { authors: 'Макарова М.Н.', title: 'Аудит доклинического центра: система координат', journal: 'Лабораторные животные для научных исследований. – 2019, №1. – С. 1-10', link: 'https://labanimalsjournal.ru/ru/2618723x-2019-01-05' },
    { authors: 'Бондарева Е.Д., Макарова М.Н., Ковалева М.А., Ходько С.В., Макаров В.Г.', title: 'Нормативно-правовое регулирование деятельности питомников и экспериментально-биологических клиник (вивариев)', journal: 'Лабораторные животные для научных исследований. – 2018, №4. – С.1-16', link: 'https://labanimalsjournal.ru/ru/2618723x-2018-04-08' },
    { authors: 'Бурова Е.Д., Ходько С.В., Гущина С.В., Макарова М.Н., Макаров В.Г.', title: 'Управление рисками для обеспечения качества доклинических исследований лекарственных средств', journal: 'Ведомости НЦЭСМП. – 2017. – Т. 7, № 1. – С. 25-32.', link: '' },
]

export default function ObespechenieKachestva() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [publicationsOpen, setPublicationsOpen] = useState(false)
    const t = translations[lang]

    return (
        <div className="min-h-screen bg-white">
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
                            <Link href="/category/news" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Новости</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <div className="px-4 py-2 space-y-2">
                                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-gray-700"><span className="text-[#F28F20]">📞</span><span className="font-medium">{t.phone}</span></a>
                                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-500 text-sm"><span className="text-[#14B7E0]">✉️</span><span>{t.email}</span></a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-[#F28F20] font-medium">Обеспечение качества</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-100 hover:border-[#F28F20] transition">
                            <span className="font-semibold text-gray-900">Меню раздела</span>
                            <svg className={`w-5 h-5 text-[#F28F20] transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {sidebarOpen && (
                            <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
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

                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4" style={{ background: "linear-gradient(to right, #F28F20, #e07d10)" }}>
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

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: "linear-gradient(to right, #F28F20, #e07d10)" }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Обеспечение качества</h1>
                            </div>

                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                                <div>
                                    <button onClick={() => setPublicationsOpen(!publicationsOpen)} className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 rounded-xl border border-gray-200 transition">
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${publicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {publicationsOpen && (
                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-[#F28F20]">
                                            {publications.map((pub, index) => (
                                                <div key={index} className="text-sm text-gray-700">
                                                    <p><span className="font-medium">{pub.authors}</span> {pub.title} {"//"} {pub.journal}{pub.link && (<a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:text-[#F28F20] hover:underline ml-1">[Ссылка]</a>)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Что делает служба качества для Вас?</h2>
                                    <p className="text-center text-gray-700 font-medium mb-6">Строгое соблюдение <span className="text-[#F28F20]">Принципов надлежащей лабораторной практики</span> и <span className="text-[#14B7E0]">ISO 9001</span></p>
                                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-[#F28F20]/20 hover:border-[#F28F20]/50 transition-colors">
                                        <img src="/images/Snimok.jpg" alt="Схема обеспечения качества" className="w-full h-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

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
                                <p className="flex items-center gap-3"><span className="text-[#F28F20]">📞</span><a href={`tel:${t.phone}`} className="hover:text-[#F28F20] transition font-medium">{t.phone}</a></p>
                                <p className="flex items-center gap-3"><span className="text-[#14B7E0]">✉️</span><a href={`mailto:${t.email}`} className="hover:text-[#14B7E0] transition break-all">{t.email}</a></p>
                                <p className="flex items-start gap-3 leading-relaxed"><span className="text-[#146FA8] mt-0.5">📍</span><span>188663, Россия, Ленинградская область,<br/>Всеволожский район, г.п. Кузьмоловский,<br/>Заводская улица, 3-245</span></p>
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