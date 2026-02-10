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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 h-full">
                            <img src="/logo/logo-vector.png" alt="АО НПО ДОМ ФАРМАЦИИ" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className="hidden md:flex border-l-2 border-gray-300 pl-4 h-12 items-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">НПО Дом фармации</h1>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на доклинику</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на НИР</Link>
                            </div>
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <div className="text-right">
                                <a href={`tel:${t.phone}`} className="block text-sm font-semibold text-gray-900 hover:text-blue-600 transition">{t.phone}</a>
                                <a href={`mailto:${t.email}`} className="block text-xs text-gray-500 hover:text-blue-600 transition">{t.email}</a>
                            </div>
                        </div>
                        <div className="flex md:hidden items-center gap-2">
                            <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition" aria-label="Меню">
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
                    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg transition-all">Заявка на доклинику</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center font-medium rounded-lg transition-all">Заявка на НИР</Link>
                            <div className="border-t border-gray-200 my-3"></div>
                            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">Главная</Link>
                            <Link href="/o-nas" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">Контакты</Link>
                            <Link href="/category/news" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition">Новости</Link>
                            <div className="border-t border-gray-200 my-3"></div>
                            <div className="px-4 py-2 space-y-2">
                                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-gray-700"><span className="text-blue-600">📞</span><span className="font-medium">{t.phone}</span></a>
                                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-500 text-sm"><span className="text-blue-600">✉️</span><span>{t.email}</span></a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-blue-600 transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">Обеспечение качества</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
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
                                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">{item.title}</a>
                                        ) : (
                                            <Link key={index} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>{item.title}</Link>
                                        )
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>

                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4">
                                <h3 className="text-white font-bold">Меню</h3>
                            </div>
                            <nav className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {menuItems.map((item, index) => (
                                    item.external ? (
                                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">{item.title}</a>
                                    ) : (
                                        <Link key={index} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>{item.title}</Link>
                                    )
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-6 sm:px-8 py-6 sm:py-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Обеспечение качества</h1>
                            </div>

                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                                <div>
                                    <button onClick={() => setPublicationsOpen(!publicationsOpen)} className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 rounded-xl border border-gray-200 transition">
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${publicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {publicationsOpen && (
                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-blue-200">
                                            {publications.map((pub, index) => (
                                                <div key={index} className="text-sm text-gray-700">
                                                    <p><span className="font-medium">{pub.authors}</span> {pub.title} {"//"} {pub.journal}{pub.link && (<a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">[Ссылка]</a>)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <p className="text-lg sm:text-xl font-semibold text-gray-800 italic">«Готовы к изменениям без предубеждений, сохраняя фокус и скорость реакций»</p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                                    <p className="text-center text-blue-900 font-medium">Система менеджмента качества сертифицирована на соответствие <strong>Принципам надлежащей лабораторной практики GLP</strong> и стандарту <strong>ISO 9001:2015</strong></p>
                                </div>

                                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                                    <p className="text-justify leading-relaxed">В соответствии с политикой в области качества <strong>главной целью</strong> деятельности АО «НПО «ДОМ ФАРМАЦИИ» является создание высокой степени удовлетворенности потребителей научным уровнем и сроками оказываемых услуг посредством обеспечения правильности, достоверности и объективности результатов, гарантирующих высокое качество проводимых испытаний, а также формирования устойчивого доверия со стороны потребителя.</p>
                                    <p className="text-justify leading-relaxed">Обеспечение качества – основа осуществления главной цели АО «НПО «ДОМ ФАРМАЦИИ» и гарантия качественного выполнения исследований.</p>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center">Что делает служба качества для Вас?</h2>
                                    <p className="text-center text-gray-700 font-medium mb-6">Строгое соблюдение Принципов надлежащей лабораторной практики и ISO 9001</p>
                                    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                                        <img src="/images/Snimok.jpg" alt="Схема обеспечения качества" className="w-full h-auto" />
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <p className="text-justify leading-relaxed text-gray-700">Коллектив службы качества – высококвалифицированные специалисты, имеющие большой опыт выполнения научно-исследовательских работ, что позволяет обеспечивать высокое качество выполняемых работ.</p>
                                    <p className="text-justify leading-relaxed text-gray-700">Наши специалисты службы качества регулярно проходят обучение по менеджменту качества, повышая свою квалификацию, внедряя на практике новейшие методические приемы в области надлежащих практик.</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 mt-12 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">{t.footerInfo}</h3>
                            <ul className="space-y-3 sm:space-y-4 text-sm text-gray-600">
                                <li><Link href="/o-nas" className="hover:text-gray-900 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>{t.footerAbout}</Link></li>
                                <li><Link href="/category/news" className="hover:text-gray-900 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>{t.footerNews}</Link></li>
                                <li><Link href="/kontakty" className="hover:text-gray-900 transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>{t.footerContacts}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">{t.footerOurContacts}</h3>
                            <div className="space-y-3 sm:space-y-4 text-sm text-gray-600">
                                <p className="flex items-center gap-3"><span className="text-blue-600">📞</span><a href={`tel:${t.phone}`} className="hover:text-gray-900 transition font-medium">{t.phone}</a></p>
                                <p className="flex items-center gap-3"><span className="text-blue-600">✉️</span><a href={`mailto:${t.email}`} className="hover:text-gray-900 transition break-all">{t.email}</a></p>
                                <p className="flex items-start gap-3 leading-relaxed"><span className="text-blue-600 mt-0.5">📍</span><span>{t.footerAddress}</span></p>
                            </div>
                        </div>
                        <div className="sm:col-span-2 md:col-span-1">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 sm:mb-6">{t.footerHowToGet}</h3>
                            <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Adc7b04b68a41ad1bdf18c8112ff573806757e0f708dfd54378d8ba4859993f58" width="100%" height="180" frameBorder="0" allowFullScreen={true} className="rounded-xl sm:rounded-2xl shadow-lg" title="Карта" />
                        </div>
                    </div>
                    <div className="pt-6 sm:pt-8 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-500">
                        <p className="font-medium">{t.footerCopyright}</p>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    )
}