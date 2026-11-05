'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },
    { href: '/immunogennost-aktivnost', title: 'Иммуноактивность' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Отдел гистологии и патоморфологии' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии', active: true },
    { href: '/farmacevticheskaya-razrabotka', title: 'Фармацевтическая разработка' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Отдел лабораторной диагностики' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/farmakokinetika', title: 'Фармакокинетика' },
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const publications = [
    { authors: 'Крышень К.Л., Мужикян А.А., Алякринская А.А., Ковалева М.А., Макарова М.Н., Макаров В.Г.', title: 'Внутрикожная инъекция бактерий Staphylococcus aureus в скафоконхальный угол ушной раковины как модель акне у лабораторных животных', journal: 'Международный вестник ветеринарии. -2017, № [id]. –С. 84-91.', link: '/wp-content/uploads/2014/12/Vnutrikozhnaya-in-ektsiya-bakterij-Staphylococcus-aureus-v-skafokonhal-ny-j-ugol-ushnoj-rakoviny-kak-model-akne-u-laboratorny-h-zhivotny-h.pdf' },
    { authors: 'Боровкова К.Е., Крышень А.А., Крышень К.Л., Петрова А.В., Макарова М.Н.', title: 'Особенности работы с лабораторными животными в условиях микробиологической лаборатории', journal: 'Лабораторные животные для научных исследований. – 2019, № [id]. – С. [id]-8.', link: 'https://labanimalsjournal.ru/ru/2618723x-2019-01-09' },
    { authors: 'Хайбунасова Л.Р., Боровкова К.Е., Салмова Ю.В.', title: 'Бактериальные инфекции легких. Модели на животных', journal: 'Лабораторные животные для научных исследований. – 2020, №2.', link: 'https://labanimalsjournal.ru/ru/2618723x-2020-02-06' },
    { authors: 'Гущин Я.А., Крышень А.А.', title: 'Апробация модели инфекционного, ассоциированного Helicobacter pylori, воспаления желудочно-кишечного тракта у лабораторных песчанок', journal: 'Лабораторные животные для научных исследований. – 2020, №3.', link: 'https://labanimalsjournal.ru/ru/2618723x-2020-03-08' },
]

export default function MikrobiologicheskayaLaboratoriya() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [publicationsOpen, setPublicationsOpen] = useState(false)
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
                        <span className="text-gray-900 font-medium">Отдел микробиологии</span>
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
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Отдел микробиологии</h1>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">

                                {/* Публикации */}
                                <div>
                                    <button onClick={() => setPublicationsOpen(!publicationsOpen)} className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 rounded-xl border border-gray-200 transition">
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${publicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {publicationsOpen && (
                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-[#F28F20]">
                                            {publications.map((pub, index) => (
                                                <div key={index} className="text-sm text-gray-700">
                                                    <p><span className="font-medium">{pub.authors}</span> {pub.title} // {pub.journal}{pub.link && (<a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline ml-1">[Ссылка]</a>)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <section className="space-y-5" aria-label="Направления работы отдела микробиологии">
                                    <article className="overflow-hidden rounded-2xl border border-[#F28F20]/40 bg-white shadow-md">
                                        <div className="bg-gradient-to-r from-[#F28F20] to-[#e07d10] px-5 py-4 text-white">
                                            <h2 className="text-lg font-bold leading-snug">Антимикробная активность in vivo с экспериментальным заражением</h2>
                                        </div>
                                        <div className="bg-white">
                                            <div>
                                                <ul className="list-disc space-y-3 p-5 pl-10 text-sm leading-relaxed text-gray-700 marker:text-[#F28F20] sm:p-6 sm:pl-11">
                                                    {['Мыши', 'Крысы', 'Морские свинки', 'Кролики', 'Хорьки'].map((item) => <li key={item} className="pl-1">{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </article>

                                    <div>
                                    <article className="overflow-hidden rounded-2xl border border-[#14B7E0]/40 bg-white shadow-md">
                                        <div className="bg-gradient-to-r from-[#146FA8] to-[#14B7E0] px-5 py-4 text-white">
                                            <h2 className="text-lg font-bold leading-snug">Антимикробная активность in vitro на тест-штаммах микроорганизмов</h2>
                                        </div>
                                        <div className="bg-white">
                                            <div>
                                                <ul className="list-disc space-y-3 p-5 pb-4 pl-10 text-sm leading-relaxed text-gray-700 marker:text-[#F28F20] sm:px-6 sm:pt-6 sm:pl-11">
                                                    {[
                                                        'Оценка мультирезистентности',
                                                        'Формирование устойчивости',
                                                        'Изучение мишеней и механизмов антибактериального действия',
                                                        'Оценка активности воспроизводимых препаратов',
                                                    ].map((item) => <li key={item} className="pl-1">{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </article>

                                    <div className="px-2 sm:px-6">
                                        <div className="grid grid-cols-2 gap-5" aria-hidden="true">
                                            {[0, 1].map((item) => <svg key={item} className="mx-auto h-12 w-8 text-[#14B7E0]" viewBox="0 0 32 48" fill="none"><path d="M16 2v37m0 0L7 30m9 9 9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                            <div className="rounded-2xl border border-[#14B7E0]/40 bg-white px-4 py-5 text-center text-sm font-bold text-[#153b55] shadow-md">Эталонные штаммы</div>
                                            <div className="rounded-2xl border border-[#14B7E0]/40 bg-white px-4 py-5 text-center text-sm font-bold text-[#153b55] shadow-md">Клинические изоляты</div>
                                        </div>
                                    </div>
                                    </div>

                                    <article className="overflow-hidden rounded-2xl border border-[#F28F20]/40 bg-white shadow-md">
                                        <div className="bg-gradient-to-r from-[#F28F20] to-[#e07d10] px-5 py-4 text-white">
                                            <h2 className="text-lg font-bold leading-snug">Бактериологический мониторинг</h2>
                                        </div>
                                        <div className="bg-white">
                                            <div>
                                                <ul className="list-disc space-y-3 p-5 pl-10 text-sm leading-relaxed text-gray-700 marker:text-[#F28F20] sm:p-6 sm:pl-11">
                                                    {['Здоровье животных', 'Окружающая среда'].map((item) => <li key={item} className="pl-1">{item}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </article>
                                </section>

                                {/* Основной текст */}
                                <div className="hidden" aria-hidden="true">
                                    <p className="text-justify">
                                        Микробиологическая лаборатория на базе АО «НПО «ДОМ ФАРМАЦИИ» спроектирована и оснащена в соответствии с Санитарными правилами и нормами СанПиН 3.3686-21 «Санитарно-эпидемиологические требования по профилактике инфекционных болезней».
                                    </p>

                                    <div className="bg-[#14B7E0]/10 border border-[#14B7E0]/30 rounded-xl p-4">
                                        <p className="text-gray-700 text-sm">
                                            Информация о лицензиях доступна на странице <Link href="/litsenzii-sertifikaty-udostovereniya" className="text-[#F28F20] hover:underline font-medium">Лицензии, сертификаты, удостоверения</Link>.
                                        </p>
                                    </div>

                                    <p className="text-justify">
                                        В микробиологической лаборатории проводится работа с микроорганизмами III-IV групп патогенности, включая грамположительные и грамотрицательные бактерии, дерматомицеты, дрожжевые и плесневые грибы.
                                    </p>

                                    {/* Виды деятельности */}
                                    <div className="bg-[#F28F20]/10 border border-[#F28F20]/30 rounded-xl p-4 sm:p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">В лаборатории выделено три основных вида деятельности:</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>— Определение антимикробной активности in vivo на мелких лабораторных животных с экспериментальным заражением различными патогенными агентами.</li>
                                            <li>— Определение антимикробной активности in vitro на тест штаммах микроорганизмов.</li>
                                            <li>— Специализированные услуги для питомников и вивариев лабораторных животных (бактериологический мониторинг здоровья животных и окружающей среды).</li>
                                        </ul>
                                    </div>

                                    {/* In vivo */}
                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Определение антимикробной активности исследуемых образцов в условиях in vivo</h2>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-justify mb-4">
                                                В лаборатории микробиологии спроектирована и оснащена зона содержания и работы с мелкими лабораторными животными (мыши, крысы, морские свинки, песчанки) в индивидуально-вентилируемых клетках, обеспечивающих изоляцию животных от окружающей среды и защиту персонала.
                                            </p>
                                            <p className="text-justify">
                                                Микробиологические исследования на животных позволяют оценить терапевтическую эффективность при клиническом пути применения антибактериальных и противогрибковых лекарственных средств (ЛС), про- и пребиотиков, адсорбентов, иммуномодуляторов.
                                            </p>
                                        </div>
                                        <div className="md:w-80 flex-shrink-0">
                                            <img src="/images/IMG_20180503_180110-768x576.jpg" alt="Отдел микробиологии" className="w-full h-auto rounded-xl shadow-md" />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">Экспериментальные модели:</h4>
                                        <p className="text-gray-700">
                                            острая генерализованная инфекция у мелких животных; хроническая септикопиемия (стафилококковая); пневмония c генерализацией инфекции; экспериментальный пиелонефрит; клостридиальные анаэробные инфекции, Helicobacter pylori и другие.
                                        </p>
                                    </div>

                                    {/* In vitro */}
                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Определение антимикробной активности in vitro на тест штаммах микроорганизмов</h2>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-justify mb-4">
                                                Определение антимикробной активности исследуемых образцов (хим. соединений и др.) в условиях in vitro.
                                            </p>
                                            <ul className="space-y-2 text-gray-700">
                                                <li>— Оценка спектра действия и степени антибактериальной и антифунгальной активности in vitro антибактериальных веществ и противогрибковых лекарственных средств. Определение МПК (минимальной подавляющей концентрации), МБК (минимальной бактерицидной концентрации), МФК (минимальной фунгицидной концентрации) в отношении эталонных штаммов и клинических изолятов грамположительных и грамотрицательных бактерий, дерматомицетов, дрожжевых и плесневых грибов;</li>
                                                <li>— Оценка мультирезистентности;</li>
                                                <li>— Скорость формирования устойчивости к новым соединениям;</li>
                                                <li>— Изучение мишеней и механизмов антибактериального действия соединений;</li>
                                                <li>— Оценка активности воспроизводимых препаратов.</li>
                                            </ul>
                                        </div>
                                        <div className="md:w-80 flex-shrink-0">
                                            <img src="/images/IMG_1540-768x576.jpg" alt="Исследования in vitro" className="w-full h-auto rounded-xl shadow-md" />
                                        </div>
                                    </div>

                                    {/* Мониторинг */}
                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Бактериологический мониторинг окружающей среды и здоровья животных</h2>

                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-justify mb-4">
                                                Бактериологический мониторинг окружающей среды включает в себя контроль эффективности дезинфекции помещений и инвентаря, бактериологическую оценку качества воздуха и воды.
                                            </p>
                                            <p className="text-justify">
                                                Бактериологический мониторинг здоровья лабораторных животных, проводится в смывах, соскобах, трупном материале, полученном от животных в соответствии с международными рекомендациями FELASA, 2014.
                                            </p>
                                        </div>
                                        <div className="md:w-56 flex-shrink-0">
                                            <img src="/images/IMG_1535-300x225.jpg" alt="Бактериологический мониторинг" className="w-full h-auto rounded-xl shadow-md" />
                                        </div>
                                    </div>

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
