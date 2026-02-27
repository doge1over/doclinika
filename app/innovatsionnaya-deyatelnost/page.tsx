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
    { href: '/innovatsionnaya-deyatelnost', title: 'Фармакокинетика, токсикокинетика, биоэквивалентность', active: true },
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
    'Karlina M.V., Pozharitskaya O.N., Shikov A.N., Kosman V. M., Makarova M.N., Makarov V.G. LC Method for Quantification of Lutein in Rat Plasma: Validation, and Application to a Pharmacokinetic Study // Chromatographia, 2008, Vol. 68, N 11-12, P. 949-954.',
    'Гусева С.И., Карлина М.В., Пожарицкая О.Н., Шиков А.Н., Фаустова Н.М. Валидация методики количественного определения диклофенака для оценки биоэквивалентности трансдермальных гелей in vitro // Хим-фарм. Журн. – 2010. – Т.44, №1. – С 43-46.',
    'Pozharitskaya O.N., Kosman V.M., Karlina M. V., Shikov A.N., Makarov V.G., Djachuk G. Method development and validation of an HPLC assay for the detection of hopantenic acid in human plasma and its application to a pharmacokinetic study on volunteers // Acta chromatographica, 2011, Vol. 23, P. 403-414.',
    'Karlina M.V., Pozharitskaya O.N., Kosman V.M. HPLC-UV method for quantification of shisandrol A in rat plasma: validation and application to a pharmacokinetic study // Обзоры по клинической фармакологии и лекарственной терапии, 2012, Т. 10, Вып. 2, Abstracts book of 16-th Int. Congress "Phytopharm 2012", Saint-Petersburg, Russia, 9-11.07.2012, M. 63.',
    'Косман В.М., Фаустова Н.М., Пожарицкая О.Н., Макаров В.Г. Применение и валидация иммуно-ферментного анализа для стандартизации биопрепарата // Разработка и регистрация лекарственных средств. 2015, №2 (11), С. 176-182.',
    'Косман В.М., Карлина М.В., Пожарицкая О.Н. Влияние условий пробоподготовки и режима хроматографирования на уровень фонового сигнала при ВЭЖХ-УФ-анализе плазмы крови // Ведомости НЦЭСМП. 2020, № 2, С. 121-128.',
    'Косман В.М., Карлина М.В., Макарова М.Н. Опыт разработки биоаналитических методик методом ВЭЖХ с УФ-детектированием // Фармация. 2020, Т. 69, № 3, С. 23-35.',
    'В.М. Косман, Н.М. Фаустова, И.Н. Уракова, М.В. Карлина, В.Г. Макаров Ингибирование фермента дипептидилпептидазы-4 после перорального введения кроликам экстракта гонад морских ежей (Strongylocentrotus droebahiensis) как возможный биомаркер фармакокинетики // Разработка и регистрация лекарственных средств. 2020. Т.9, №3. С. 158-165.',
    'Косман В.М., Карлина М.В. Остаточное содержание белка в биообразцах плазмы крови лабораторных животных (кроликов) после подготовки проб к анализу методом ВЭЖХ-УФ // Вопросы биологической медицинской и фармацевтической химии, 2020, Т. 23, № 10, С. 53-58.'
]

export default function InnovatsionnayaDeyatelnost() {
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
                            <img src="/logo/logo-vector.png" alt="АО НПО ДОМ ФАРМАЦИИ" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className="hidden md:flex border-l-2 border-[#F28F20]/30 pl-4 h-12 items-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">НПО Дом фармации</h1>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap shadow-md hover:shadow-lg">Заявка на доклинику</Link>
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
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинику</Link>
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
                        <span className="text-gray-900 font-medium">Фармакокинетика, токсикокинетика, биоэквивалентность</span>
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
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Фармакокинетика, токсикокинетика, биоэквивалентность</h1>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8">
                                {/* Аккордеон: Публикации */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
                                    <button
                                        onClick={() => setPublicationsOpen(!publicationsOpen)}
                                        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 transition text-left"
                                    >
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-[#F28F20] transition-transform ${publicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {publicationsOpen && (
                                        <div className="px-5 py-4 bg-white border-t border-gray-100">
                                            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                                                {publications.map((pub, index) => (
                                                    <li key={index} className="text-justify leading-relaxed pl-2">
                                                        {pub}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-lg max-w-none text-gray-700">
                                    <p className="text-justify leading-relaxed mb-6">
                                        Изучение фармакокинетики лекарственных препаратов, является обязательным этапом для внедрения в клиническую практику. В соответствии с правилами регистрации и экспертизы лекарственных средств для медицинского применения (Решение Совета ЕЭК от 03.11.2016 № 78), данные фармакокинетических исследований <strong>необходимо</strong> представлять в регистрационном досье.
                                    </p>

                                    <p className="text-justify leading-relaxed mb-4">
                                        Мы предлагаем услуги по изучению фармакокинетики лекарственных препаратов на разных этапах жизненного цикла:
                                    </p>

                                    {/* Услуги */}
                                    <div className="space-y-2 mb-4 text-gray-700">
                                        <div className="flex gap-2">
                                            <span>1.</span>
                                            <div>
                                                <span>Доклинические исследования фармакокинетики:</span>
                                                <div className="ml-4 mt-1 space-y-1">
                                                    <div className="flex gap-2">
                                                        <span>•</span>
                                                        <Link href="/innovatsionnaya-deyatelnost/doklinicheskie-issledovaniya-farmakokinetiki" className="text-[#F28F20] hover:underline">
                                                            исследование фармакокинетики <em>in vivo</em>
                                                        </Link>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span>•</span>
                                                        <Link href="/innovatsionnaya-deyatelnost/izuchenie-farmakokineticheskih-pokazatelej-substancij-v-in-vitro-sistemah" className="text-[#F28F20] hover:underline">
                                                            изучение фармакокинетических показателей субстанций в in vitro системах (ADME [Absorption, Distribution, Metabolism, and Excretion])
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>2.</span>
                                            <Link href="/innovatsionnaya-deyatelnost/doklinicheskie-issledovaniya-toksikokinetiki" className="text-[#F28F20] hover:underline">
                                                Доклинические исследования токсикокинетики
                                            </Link>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>3.</span>
                                            <Link href="/innovatsionnaya-deyatelnost/issledovanie-bioekvivalentnosti-preparatov-v-klinicheskih-issledovaniyah-analiticheskaya-chast" className="text-[#F28F20] hover:underline">
                                                Исследование биоэквивалентности препаратов в клинических исследованиях (аналитическая часть)
                                            </Link>
                                        </div>
                                    </div>

                                    <p className="text-justify leading-relaxed mb-8">
                                        Изучение фармакокинетики проводится в соответствии с требованиями регуляторных органов РФ и международных правил GLP.
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Аналитические методы</h2>

                                    <p className="text-justify leading-relaxed mb-6">
                                        Для проведения фармакокинетических и токсикокинетических исследований мы разрабатываем и валидируем методику количественного определения аналита в различных биологических образцах (плазма, моча, кал, органы), обеспечивающую возможность уверенного слежения за концентрацией фармакологического средства в биопробах.
                                    </p>

                                    <p className="text-justify leading-relaxed mb-6">
                                        Мы имеем опыт разработки и валидации аналитических и биоаналитических методик для широкого спектра аналитов.
                                    </p>

                                    <p className="text-justify leading-relaxed mb-6">
                                        Для анализа биопроб мы разрабатываем методики с использованием методов высокоэффективной жидкостной хроматографии ВЭЖХ, высокоэффективной тонкослойной хроматографии ВЭТСХ, иммуноферментного анализа ИФА, энзиматических методов.
                                    </p>

                                    <p className="text-justify leading-relaxed">
                                        Валидация аналитических методик выполняется в соответствии с рекомендациями актуальных отечественных и зарубежных руководств по следующим показателям: селективность, нижний предел количественного определения (НПКО), калибровочный диапазон, точность, прецизионность.
                                    </p>
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