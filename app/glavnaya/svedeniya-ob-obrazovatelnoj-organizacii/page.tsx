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
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации', active: true },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

// Компонент аккордеона
const Accordion = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 transition text-left"
            >
                <span className="font-semibold text-gray-900">{title}</span>
                <svg className={`w-5 h-5 text-[#F28F20] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-5 py-4 bg-white border-t border-gray-100">
                    {children}
                </div>
            )}
        </div>
    )
}

export default function SvedeniyaObObrazovatelnojOrganizacii() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
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
                    <nav className="flex flex-wrap items-center text-sm text-gray-500 gap-1">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <Link href="/glavnaya" className="hover:text-[#F28F20] transition">Сведения об образовательной организации</Link>
                        <svg className="w-4 h-4 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">Сведения об образовательной организации</span>
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
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Сведения об образовательной организации</h1>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-4">

                                {/* Основные сведения */}
                                <Accordion title="Основные сведения">
                                    <div className="space-y-3 text-gray-700">
                                        <p><strong>Полное наименование</strong> образовательной организации: <strong>Учебный центр Акционерное Общество «Научно – производственное Объединение «ДОМ ФАРМАЦИИ»</strong></p>
                                        <p><strong>Сокращенное наименование</strong> образовательной организации: <strong>УЦ АО «НПО «ДОМ ФАРМАЦИИ»</strong></p>
                                        <p><strong>Дата создания</strong> образовательной организации: <a href="https://doclinika.ru/wp-content/uploads/2024/03/Licenziya-na-osushh.obrazovatelnoj-deyatelnosti-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline font-semibold">12 ноября 2018</a></p>
                                        <p><strong>Учредители</strong> образовательной организации: Макаров Валерий Геннадьевич, Макарова Марина Николаевна, Гущина Светлана Валерьевна</p>
                                        <p><strong>Наименование представительств</strong> и филиалов образовательной организации (при наличии): представительства и филиалы отсутствуют</p>
                                        <p><strong>Место нахождения</strong> образовательной организации: Ленинградская обл., Всеволожский район, г.п. Кузьмоловский, ул. Заводская, дом 3, корп. 245.</p>
                                        <p><strong>Филиалы</strong> образовательной организации отсутствуют</p>
                                        <p><strong>Режим работы</strong> пн.-пт. 9.00-17.00, сб, вс- выходной</p>
                                        <p><strong>График работы</strong> в соответствии с Почасовым планом на 2024 год</p>
                                        <p><strong>Контактный телефон</strong>: <strong>+7(812) 603-74-28, доб.424</strong></p>
                                        <p><strong>Адрес электронной почты</strong>: <strong>edu@doclinika.ru</strong></p>
                                    </div>
                                </Accordion>

                                {/* Структура и органы управления */}
                                <Accordion title="Структура и органы управления образовательной организацией">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2023/12/2.-Struktura-i-organy-upravleniya-obrazovatelnoj-organizaciej-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Структура и органы управления образовательной организацией</a></p>
                                </Accordion>

                                {/* Документы */}
                                <Accordion title="Документы">
                                    <div className="space-y-2">
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/1.-Ustav-DF.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Устав организации АО «НПО «ДОМ ФАРМАЦИИ»</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/14.-Pravila-vnutrennego-rasporyadka-slushatelej.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Правила внутреннего распорядка слушателей</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2022/04/Otchet-o-samoobsledovanii-uchebnogo-centra-za-2021-god.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Отчет о самообследовании за 2021 год</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/Otchjot-o-rezultatah-samoobsledovaniya-za-2022-god.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Отчет о самообследовании за 2022 год</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/05/Otchet-o-rezultatah-samoobsledovaniya-2023-god-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Отчет о самообследовании за 2023 год</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2025/09/Otchet-o-rezultatah-samoobsledovaniya-2024-god-S-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Отчет о самообследовании за 2024 год</a></p>
                                        <p className="text-gray-600">Предписаний организация не имеет</p>
                                        <div className="mt-4 space-y-2">
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/15.-Pravila-priema-grazhdan-na-obuchenie.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">1. Правила приема граждан на обучение</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/4.-Polozhenie-o-kontrole-uspevaemosti.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">2. Положение о контроле успеваемости слушателей</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/13.-Polozhenie-ob-Uchebnom-centre.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">3. Положение об Учебном центре</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/3.-Polozhenie-o-vnesenii-dannyh-v-FIS-FRDO.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">4. Положение о ФИС ФРДО</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/5.-Polozhenie-o-personalnyh-dannyh.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">5. Положение о персональных данных</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/6.-Polozhenie-o-poryadke-vedeniya-zhurnala-ucheta-uchebnoj-raboty.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">6. Положение о журнале учета</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/7.-Polozhenie-o-poryadke-vydachizapolneniyahraneniyaunichtozheniya-udostoverenij.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">7. Положение о выдаче документов</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/8.-Polozhenie-o-programme-DPP-PK.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">8. Положение о программе ДПП ПК</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/9.-Polozhenie-o-sajte-1-1.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">9. Положение о сайте</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/10.-Polozhenie-o-samoobsledovanii.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">10. Положение о самообследовании</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/11.-Polozhenie-o-EO-i-DOT.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">11. Положение об электронном обучении</a></p>
                                            <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/12.-Polozhenie-ob-okazanii-platnyh-obrazovatelnyh-uslug.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">12. Положение о платных услугах</a></p>
                                        </div>
                                    </div>
                                </Accordion>

                                {/* Образование */}
                                <Accordion title="Образование">
                                    <div className="space-y-6">
                                        {/* Программа 1 */}
                                        <div className="border-l-4 border-[#F28F20] pl-4">
                                            <p className="font-bold text-gray-900">Программа повышения квалификации «Специалист в области исследований лекарственных средств в соответствии с надлежащей лабораторной практикой (GLP)», 122 часа</p>
                                            <div className="mt-2 space-y-1">
                                                <p>а) <a href="https://doclinika.ru/wp-content/uploads/2026/01/Realizuemaya-obrazovatelnaya-programma-kurs-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Реализуемая образовательная программа</a></p>
                                                <p>б) <a href="https://doclinika.ru/wp-content/uploads/2024/03/Programma-kursa-sokrashhennaya-dlya-sajta-podpisannyj.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Описание образовательной программы</a></p>
                                                <p><a href="https://doclinika.ru/wp-content/uploads/2026/01/Programma-Specialist-dlya-sajta-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Учебный план на 2026 год</a></p>
                                                <p><a href="https://doclinika.ru/wp-content/uploads/2026/01/Kalendarnyj-uchebnyj-grafik-i-stoimost-Specialist-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Календарный учебный график на 2026 год</a></p>
                                                <p>в) <a href="https://doclinika.ru/wp-content/uploads/2024/03/Chislennost-obuchajushhihsya-po-realizuemoj-programme-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Численность обучающихся</a></p>
                                                <p>г) <a href="https://doclinika.ru/wp-content/uploads/2024/03/Licenziya-na-osushh.obrazovatelnoj-deyatelnosti-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Лицензия на образовательную деятельность</a></p>
                                            </div>
                                        </div>
                                        
                                        {/* Программа 2 */}
                                        <div className="border-l-4 border-[#14B7E0] pl-4">
                                            <p className="font-bold text-gray-900">Программа профессиональной переподготовки «Токсикология и фармакология для специалиста в области надлежащей лабораторной практики (GLP)», 540 часов</p>
                                            <div className="mt-2 space-y-1">
                                                <p>а) <a href="https://doclinika.ru/wp-content/uploads/2026/01/Realizuemaya-obrazovatelnaya-programma-po-perepodgotovke-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">Реализуемая образовательная программа</a></p>
                                                <p>б) <a href="https://doclinika.ru/wp-content/uploads/2026/01/Uchebnyj-plan-po-programme-Perepodgotovka-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">Учебный план на 2026 год</a></p>
                                                <p><a href="https://doclinika.ru/wp-content/uploads/2026/01/Kalendarnyj-uch-grafik-i-stoimost-2026-PEREPODGOTOVKA.pdf" target="_blank" rel="noopener noreferrer" className="text-[#14B7E0] hover:underline">Календарный учебный график на 2026 год</a></p>
                                            </div>
                                        </div>

                                        {/* Программа 3 */}
                                        <div className="border-l-4 border-[#146FA8] pl-4">
                                            <p className="font-bold text-gray-900">Программа повышения квалификации «Аудитор системы менеджмента качества в области надлежащей лабораторной практики (GLP)», 42 часа</p>
                                            <div className="mt-2 space-y-1">
                                                <p>а) <a href="https://doclinika.ru/wp-content/uploads/2024/07/Realizuemaya-obrazovatelnaya-programma-Auditor.pdf" target="_blank" rel="noopener noreferrer" className="text-[#146FA8] hover:underline">Реализуемая образовательная программа</a></p>
                                                <p><a href="https://doclinika.ru/wp-content/uploads/2026/01/Kalendarnyj-uchebnyj-grafik-i-stoimost-obucheniya-Auditor-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#146FA8] hover:underline">Календарный учебный график на 2026 год</a></p>
                                            </div>
                                        </div>

                                        {/* Программа 4 */}
                                        <div className="border-l-4 border-[#F28F20] pl-4">
                                            <p className="font-bold text-gray-900">Программа повышения квалификации «Дизайн эксперимента в соответствии с принципами ARRIVE», 28 часов</p>
                                            <div className="mt-2 space-y-1">
                                                <p>а) <a href="https://doclinika.ru/wp-content/uploads/2026/01/Realizuemaya-obrazovatelnaya-programma-ARRIVE-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Реализуемая образовательная программа</a></p>
                                                <p><a href="https://doclinika.ru/wp-content/uploads/2026/01/Kalendarnyj-uchebnyj-grafik-i-stoimost-ARRIVE-2026.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Календарный учебный график на 2026 год</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion>

                                {/* Образовательные стандарты */}
                                <Accordion title="Образовательные стандарты и требования">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Obrazovatelnye-standarty-i-trebovaniya-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Образовательные стандарты и требования</a></p>
                                </Accordion>

                                {/* Руководство */}
                                <Accordion title="Руководство. Педагогический (научно-педагогический) состав">
                                    <div className="space-y-2">
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Rukovodstvo.-Pedagogicheskij-sostav-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Руководство. Педагогический состав</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Personalnyj-sostav-pedagogicheskih-rabotnikov-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Персональный состав педагогических работников</a></p>
                                    </div>
                                </Accordion>

                                {/* Материально-техническое обеспечение */}
                                <Accordion title="Материально-техническое обеспечение и оснащенность образовательного процесса">
                                    <div className="space-y-2">
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Materialno-tehnicheskoe-obespechenie-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Материально-техническое обеспечение</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2020/10/Protivopozharnaya-bezopasnost-1.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Заключение МЧС</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2020/10/San-epid-zakljuchenie.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Санитарно-Эпидемиологическое заключение</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2020/10/Specialnye-usloviya-dlya-slushatelej-s-OVZ.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Специальные условия для слушателей с ОВЗ</a></p>
                                    </div>
                                </Accordion>

                                {/* Стипендии */}
                                <Accordion title="Стипендии и меры поддержки обучающихся">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Stipendii-i-mery-podderzhki-obuchajushhihsya-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Стипендии и меры поддержки обучающихся</a></p>
                                </Accordion>

                                {/* Платные услуги */}
                                <Accordion title="Платные образовательные услуги">
                                    <div className="space-y-2">
                                        <p>а) <a href="https://doclinika.ru/wp-content/uploads/2023/05/12.-Polozhenie-ob-okazanii-platnyh-obrazovatelnyh-uslug.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Положение об оказании платных образовательных услуг</a></p>
                                        <p>б) <a href="https://doclinika.ru/wp-content/uploads/2026/01/prikaz-01-UC-26-na-kalendarnyj-uch-grafik-i-stoimost-na-2026-NOVYJ.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Приказ об утверждении стоимости обучения на 2026 год</a></p>
                                        <p className="text-gray-600">в) Размер платы, взимаемой с родителей – не предусмотрено</p>
                                    </div>
                                </Accordion>

                                {/* Финансово-хозяйственная деятельность */}
                                <Accordion title="Финансово-хозяйственная деятельность">
                                    <div className="space-y-2">
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Finansovo-hozyajstvennaya-deyatelnost-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Финансово-хозяйственная деятельность</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2022/04/Rezultaty-finansovo-hozyajstvennoj-deyatelnosti-za-2021-god.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Результаты за 2021 год</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2023/03/Rezultaty-finansovo-hozyajstvennoj-deyatelnosti-za-2022-god.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Результаты за 2022 год</a></p>
                                        <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Rezultaty-finansovo-hozyajstvennoj-deyatelnosti-za-2023-god.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Результаты за 2023 год</a></p>
                                    </div>
                                </Accordion>

                                {/* Вакантные места */}
                                <Accordion title="Вакантные места для приема (перевода) обучающихся">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Vakantnye-mesta-dlya-priema-perevoda-obuchajushhihsya-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Вакантные места для приема (перевода) обучающихся</a></p>
                                </Accordion>

                                {/* Доступная среда */}
                                <Accordion title="Доступная среда">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Dostupnaya-sreda-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Доступная среда</a></p>
                                </Accordion>

                                {/* Международное сотрудничество */}
                                <Accordion title="Международное сотрудничество">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2024/03/Mezhdunarodnoe-sotrudnichestvo-s-EP.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Международное сотрудничество</a></p>
                                </Accordion>

                                {/* Обратная связь */}
                                <Accordion title="Обратная связь">
                                    <div className="space-y-2">
                                        <p><a href="mailto:edu@doclinika.ru" className="text-[#F28F20] hover:underline">edu@doclinika.ru</a></p>
                                        <p className="text-gray-700">+7 (812) 603-74-28 доб. 424</p>
                                    </div>
                                </Accordion>

                                {/* Отзывы */}
                                <Accordion title="Отзывы">
                                    <p><a href="https://doclinika.ru/wp-content/uploads/2023/05/Otzyvy-slushatelej.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">Отзывы наших слушателей</a></p>
                                </Accordion>

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
