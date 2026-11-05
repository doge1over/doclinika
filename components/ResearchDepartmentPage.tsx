'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'

export type ResearchBlock =
    | { kind: 'heading'; text: string }
    | { kind: 'paragraph'; text: string }
    | { kind: 'external-link'; text: string; href: string }
    | { kind: 'list'; items: string[] }
    | { kind: 'publications'; title: string; items: string[] }
    | { kind: 'diagnostics-services'; title: string; items: string[] }
    | { kind: 'immuno-overview' }
    | { kind: 'histology-flow' }
    | { kind: 'pharmacokinetics-flow'; sections: { title: string; blocks: ResearchBlock[] }[] }
    | { kind: 'pharmacokinetics-services'; items: { title: string; details?: string[] }[] }
    | { kind: 'regulations'; title: string; items: string[] }
    | { kind: 'image'; src: string; alt: string; caption: string }

type Props = {
    active: 'development' | 'pharmacokinetics' | 'immunogenicity' | 'diagnostics' | 'histology'
    title: string
    blocks: ResearchBlock[]
    note?: string
}

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },
    { href: '/immunogennost-aktivnost', title: 'Иммуноактивность', id: 'immunogenicity' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Отдел гистологии и патоморфологии', id: 'histology' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },
    { href: '/farmacevticheskaya-razrabotka', title: 'Фармацевтическая разработка', id: 'development' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Отдел лабораторной диагностики', id: 'diagnostics' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/farmakokinetika', title: 'Фармакокинетика', id: 'pharmacokinetics' },
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

export default function ResearchDepartmentPage({ active, title, blocks, note }: Props) {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [museumSlide, setMuseumSlide] = useState(0)
    const [museumPhotoVisible, setMuseumPhotoVisible] = useState(false)
    const [microMuseumSlide, setMicroMuseumSlide] = useState(0)
    const [openedPhoto, setOpenedPhoto] = useState<{ src: string; title: string } | null>(null)
    const t = translations[lang]
    const museumSlides = [
        {
            title: 'Щенки: самка и самец',
            description: 'Макропрепарат — щенки: самка и самец.',
            src: '/images/micro/щенки.jpeg',
        },
        {
            title: 'Игрунка',
            description: 'Игрунка.',
            src: '/images/micro/игрунка.jpg',
        },
    ]
    const microMuseumSlides = [
        {
            title: 'Почка крысы',
            description: 'Гистологический срез нормальной почки крысы. В корковом веществе определяются почечные тельца (клубочки с капсулой), проксимальные и дистальные извитые канальцы. Окраска гематоксилином и эозином. 200×.',
            src: '/images/macro/Почка крысы.jpg',
        },
        {
            title: 'Яичник крысы',
            description: 'Гистологический срез нормального яичника крысы. В корковом веществе определяются фолликулы на всех стадиях созревания: примордиальные, первичные, вторичные (антральные), зрелые (граафовы пузырьки), а также жёлтые тела. Окраска гематоксилином и эозином. 100×.',
            src: '/images/macro/Крыса самка половая система_17.5x.jpg',
        },
        {
            title: 'Эмбрион крысы',
            description: 'Продольный гистологический срез эмбриона крысы на поздней стадии развития. Визуализируются почти полностью сформированные органы и системы: головной и спинной мозг, позвоночник, печень, лёгкие, желудочно-кишечный тракт, почки, закладки конечностей. Окраска гематоксилином и эозином.',
            src: '/images/macro/эмбрион.jpg',
        },
        {
            title: 'Селезёнка крысы, CD20',
            description: 'Срез селезёнки крысы, ИГХ-окраска на CD20. В белой пульпе визуализируются B-клеточные зоны лимфоидных фолликулов — мантийная зона и герминативные центры, интенсивно экспрессирующие CD20. 100×.',
            src: '/images/macro/селезенка cd20.jpg',
        },
        {
            title: 'Контузионная травма спинного мозга',
            description: 'Спинной мозг карликовой свиньи, контузионная травма. Пограничная зона очага повреждения: наряду с деструкцией вещества спинного мозга (некроз, отёк, распад миелиновых волокон) сохраняются цепочки «живых» мотонейронов в передних рогах. Зона отражает переход между необратимо повреждённой и сохранной тканью. Окраска по Нисслю. 200×.',
            src: '/images/macro/Травма СМ НИссль.jpg',
        },
        {
            title: 'Шейная область крысы, Ki67',
            description: 'Поперечный гистологический срез шейной области крысы. Норма. Иммуногистохимическое окрашивание на Ki67 (маркер пролиферации). Позитивное окрашивание клеток эпителия трахеи, пищевода и щитовидной железы отражает физиологическую пролиферативную активность. В соединительной и мышечной ткани позитивные ядра единичны — пролиферативная активность дифференцированных тканей низкая.',
            src: '/images/macro/трахея пищевод.jpg',
        },
    ]

    const sectionMenu = (
        <nav className="py-2">
            {menuItems.map((item, index) => {
                const isActive = item.id === active
                return item.external ? (
                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">
                        {item.title}
                    </a>
                ) : (
                    <Link key={index} href={item.href} className={`block px-5 py-2.5 text-sm transition ${isActive ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )

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
                            <div className="border-t border-gray-100 my-3" />
                            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Главная</Link>
                            <Link href="/o-nas" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Контакты</Link>
                        </div>
                    </div>
                )}
            </header>

            <div className="bg-white border-b border-[#F28F20]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">{title}</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200">
                            <span className="font-semibold text-gray-900">Меню раздела</span>
                            <svg className={`w-5 h-5 text-gray-500 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {sidebarOpen && <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">{sectionMenu}</div>}
                    </div>

                    <aside className="hidden w-72 flex-shrink-0 self-start lg:block" style={{ overflowAnchor: 'none' }}>
                        <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-5 py-4" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h3 className="text-white font-bold">Меню</h3>
                            </div>
                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">{sectionMenu}</div>
                        </div>
                    </aside>

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
                            </div>

                            <div className="px-6 sm:px-8 py-6 sm:py-8 text-gray-700">
                                <div className="space-y-8">
                                    {blocks.map((block, index) => {
                                        if (block.kind === 'heading') {
                                            return <h2 key={index} className={`text-xl font-bold text-gray-900 mb-4 ${active === 'immunogenicity' ? 'immuno-document-heading' : ''}`}>{block.text}</h2>
                                        }
                                        if (block.kind === 'paragraph') {
                                            return <p key={index} className={`text-justify leading-relaxed ${active === 'immunogenicity' ? 'immuno-document-intro' : ''}`}>{block.text}</p>
                                        }
                                        if (block.kind === 'external-link') {
                                            return <p key={index} className="text-justify leading-relaxed"><a href={block.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0f91b2] underline decoration-[#14B7E0]/40 underline-offset-4 transition hover:text-[#F28F20]">{block.text}</a></p>
                                        }
                                        if (block.kind === 'list') {
                                            if (active === 'development') {
                                                const stageTitles = [
                                                    'Информационная проработка',
                                                    'Преформуляционные исследования',
                                                    'Лабораторный этап разработки',
                                                    'Наработка лекарственной формы',
                                                    'Исследования стабильности',
                                                    'Проект нормативного документа',
                                                ]
                                                const stageSummaries = [
                                                    'Анализ темы и исходных данных для научно-исследовательской работы',
                                                    'Изучение физико-химических и технологических свойств, стабильности АФС · разработка и предварительная валидация аналитических методик · выбор вспомогательных веществ',
                                                    'Совместимость компонентов · состав и технология ЛФ · высвобождение in vitro · выбор первичной упаковки',
                                                    'Наработка образцов ГЛФ, аналитические исследования, изучение стабильности',
                                                    'Долгосрочные, промежуточные и ускоренные исследования стабильности АФС и готовой ЛФ',
                                                    'Составление проекта НД на АФС и готовую лекарственную форму',
                                                ]
                                                return (
                                                    <ol key={index} className="development-stages" aria-label="Этапы фармацевтической разработки">
                                                        {block.items.map((item, itemIndex) => <li key={itemIndex} className="development-stages__item" tabIndex={0}>
                                                            <div className="development-stages__card">
                                                                <span className="development-stages__number">{itemIndex + 1}</span>
                                                                <span className="development-stages__text">
                                                                    <strong>{stageTitles[itemIndex] || `Этап ${itemIndex + 1}`}</strong>
                                                                    <small>{stageSummaries[itemIndex]}</small>
                                                                </span>
                                                            </div>
                                                            <div className="development-stages__description" role="tooltip">{item}</div>
                                                            {itemIndex < block.items.length - 1 && <span className="development-stages__arrow" aria-hidden="true">
                                                                <svg viewBox="0 0 16 24"><path d="M8 2v18m0 0-5-5m5 5 5-5" /></svg>
                                                            </span>}
                                                        </li>)}
                                                    </ol>
                                                )
                                            }
                                            return (
                                                <ul key={index} className={`space-y-2 ${active === 'immunogenicity' ? 'immuno-document-regulations' : ''}`}>
                                                    {block.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex gap-2 leading-relaxed">
                                                            <span className="text-[#F28F20]">—</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        }
                                        if (block.kind === 'publications') {
                                            return (
                                                <details key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                                    <summary className="cursor-pointer px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 font-semibold text-gray-900">
                                                        {block.title} ({block.items.length})
                                                    </summary>
                                                    <ol className="list-decimal space-y-3 border-t border-gray-100 px-8 py-5 text-sm leading-relaxed">
                                                        {block.items.map((item, itemIndex) => <li key={itemIndex} className="pl-1">{item}</li>)}
                                                    </ol>
                                                </details>
                                            )
                                        }
                                        if (block.kind === 'diagnostics-services') {
                                            return (
                                                <div key={index} className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th className="bg-gradient-to-r from-[#146FA8] to-[#14B7E0] px-5 py-4 text-left text-lg font-bold text-white sm:text-xl">
                                                                    {block.title}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {block.items.map((item, itemIndex) => (
                                                                <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-[#14B7E0]/5'}>
                                                                    <td className="border-t border-gray-200 px-5 py-3.5 leading-relaxed text-gray-800">
                                                                        {item}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        }
                                        if (block.kind === 'immuno-overview') {
                                            return (
                                                <section key={index} className="immuno-simple" aria-label="Направления исследований иммуноактивности">
                                                    <div className="immuno-simple__pair">
                                                        <div className="immuno-simple__block">Разработка и валидация методик для оценки иммуногенности</div>
                                                        <span className="immuno-simple__arrow" aria-hidden="true"><svg viewBox="0 0 64 24"><path d="M2 12h56M49 4l9 8-9 8" /></svg></span>
                                                        <div className="immuno-simple__block">Скрининговый и подтверждающий анализ, оценка нейтрализующих антител</div>
                                                    </div>

                                                    <div className="immuno-simple__block immuno-simple__block--single">Разработка и валидация методик по анализу биомаркеров у человека и животных</div>

                                                    <span className="immuno-simple__flow-arrow" aria-hidden="true">
                                                        <svg viewBox="0 0 24 64"><path d="M12 2v56M4 49l8 9 8-9" /></svg>
                                                    </span>

                                                    <div className="immuno-simple__static">
                                                        <div className="immuno-simple__block immuno-simple__block--single"><i>In vitro</i> оценка связывания исследуемых веществ <span className="immuno-underline immuno-underline--blue">со специфическими рецепторами</span> с определением <span className="immuno-underline immuno-underline--orange">кинетических параметров связывания</span>.</div>
                                                        <div className="immuno-simple__popup">
                                                            <div className="immuno-simple__popup-card immuno-simple__popup-card--method">
                                                                <strong>Методы ИФА и биослойной интерферометрии</strong>
                                                            </div>
                                                            <div className="immuno-simple__popup-card">
                                                                <ul>
                                                                    <li>константы скорости ассоциации (kas),</li>
                                                                    <li>константы скорости диссоциации (kdis),</li>
                                                                    <li>константы равновесной диссоциации, аффинность (KD).</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            )
                                        }
                                        if (block.kind === 'histology-flow') {
                                            const ArrowDown = ({ split = false }: { split?: boolean }) => (
                                                <div className={split ? 'grid grid-cols-2 gap-4 sm:gap-8' : 'flex justify-center'} aria-hidden="true">
                                                    {(split ? [0, 1] : [0]).map((item) => <svg key={item} className="mx-auto h-12 w-8 text-[#14B7E0]" viewBox="0 0 32 48" fill="none"><path d="M16 2v37m0 0L7 30m9 9 9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                                                </div>
                                            )
                                            const Card = ({ title, children, accent = 'blue' }: { title: string; children: React.ReactNode; accent?: 'blue' | 'orange' }) => (
                                                <section className={`overflow-hidden rounded-2xl border bg-white shadow-md ${accent === 'orange' ? 'border-[#F28F20]/40' : 'border-[#14B7E0]/40'}`}>
                                                    <h3 className={`px-5 py-4 text-lg font-bold text-white ${accent === 'orange' ? 'bg-gradient-to-r from-[#F28F20] to-[#e07d10]' : 'bg-gradient-to-r from-[#146FA8] to-[#14B7E0]'}`}>{title}</h3>
                                                    <div className="space-y-4 p-5 text-sm leading-relaxed text-gray-700 sm:p-6">{children}</div>
                                                </section>
                                            )
                                            return (
                                                <section key={index} className="rounded-3xl bg-gradient-to-b from-[#eef8fb] to-white p-4 sm:p-7" aria-label="Этапы патоморфологической диагностики">
                                                    <Card title="Макроскопическое исследование (аутопсия)" accent="orange">
                                                        <p>Полное вскрытие с органометрией и детальным описанием макропрепаратов. Фиксируются размер, цвет, консистенция и очаговые поражения.</p>
                                                        <div className="rounded-xl border border-dashed border-[#F28F20]/50 bg-[#F28F20]/5 p-4">
                                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                                <h4 className="font-bold text-gray-900">Музей макро</h4>
                                                                <div className="flex items-center gap-2" aria-label="Навигация карусели">
                                                                    <span className="mr-1 text-xs text-gray-500">{museumSlide + 1} / {museumSlides.length}</span>
                                                                    <button type="button" onClick={() => setMuseumSlide((museumSlide - 1 + museumSlides.length) % museumSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-[#F28F20]/40 bg-white text-[#F28F20] transition hover:bg-[#F28F20] hover:text-white" aria-label="Предыдущее фото">←</button>
                                                                    <button type="button" onClick={() => setMuseumSlide((museumSlide + 1) % museumSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-[#F28F20]/40 bg-white text-[#F28F20] transition hover:bg-[#F28F20] hover:text-white" aria-label="Следующее фото">→</button>
                                                                </div>
                                                            </div>
                                                            <div className="relative grid min-h-52 place-items-center overflow-hidden rounded-lg border border-gray-200 bg-black/5 text-center" role="group" aria-roledescription="карусель" aria-label={museumSlides[museumSlide].title}>
                                                                <button type="button" onClick={() => museumPhotoVisible && setOpenedPhoto(museumSlides[museumSlide])} className="grid w-full cursor-zoom-in place-items-center" aria-label={`Открыть фото: ${museumSlides[museumSlide].title}`}>
                                                                    <img key={museumSlides[museumSlide].src} src={museumSlides[museumSlide].src} alt={museumSlides[museumSlide].title} className={`max-h-80 w-full object-contain transition duration-300 ${museumPhotoVisible ? '' : 'select-none blur-xl'}`} />
                                                                </button>
                                                                {!museumPhotoVisible && <div className="absolute inset-0 grid place-items-center bg-gray-950/35 p-5 text-white backdrop-blur-sm">
                                                                    <div className="max-w-sm"><strong className="block text-base">Предупреждение</strong><p className="mt-2 text-sm leading-relaxed">На фото анатомические детали, контент может быть неприятен для части аудитории.</p><button type="button" onClick={() => setMuseumPhotoVisible(true)} className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:bg-[#F28F20] hover:text-white">Показать фото</button></div>
                                                                </div>}
                                                            </div>
                                                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{museumSlides[museumSlide].description}</p>
                                                            <div className="mt-3 flex justify-center gap-2" aria-label="Выбор слайда">
                                                                {museumSlides.map((slide, slideIndex) => <button key={slide.src} type="button" onClick={() => setMuseumSlide(slideIndex)} className={`h-2.5 rounded-full transition-all ${museumSlide === slideIndex ? 'w-7 bg-[#F28F20]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} aria-label={`Показать ${slide.title}`} aria-current={museumSlide === slideIndex ? 'true' : undefined} />)}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    <ArrowDown />
                                                    <Card title="Микроскопический анализ и морфометрия">
                                                        <p>Исследование готовых препаратов на современных световых микроскопах с документированием изображения.</p>
                                                        <div className="rounded-xl border border-dashed border-[#14B7E0]/50 bg-[#14B7E0]/5 p-4">
                                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                                <h4 className="font-bold text-gray-900">Музей микро</h4>
                                                                <div className="flex items-center gap-2" aria-label="Навигация карусели">
                                                                    <span className="mr-1 text-xs text-gray-500">{microMuseumSlide + 1} / {microMuseumSlides.length}</span>
                                                                    <button type="button" onClick={() => setMicroMuseumSlide((microMuseumSlide - 1 + microMuseumSlides.length) % microMuseumSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-[#14B7E0]/40 bg-white text-[#146FA8] transition hover:bg-[#14B7E0] hover:text-white" aria-label="Предыдущее фото">←</button>
                                                                    <button type="button" onClick={() => setMicroMuseumSlide((microMuseumSlide + 1) % microMuseumSlides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-[#14B7E0]/40 bg-white text-[#146FA8] transition hover:bg-[#14B7E0] hover:text-white" aria-label="Следующее фото">→</button>
                                                                </div>
                                                            </div>
                                                            <div className="grid min-h-52 place-items-center overflow-hidden rounded-lg border border-gray-200 bg-black/5 text-center" role="group" aria-roledescription="карусель" aria-label={microMuseumSlides[microMuseumSlide].title}>
                                                                <button type="button" onClick={() => setOpenedPhoto(microMuseumSlides[microMuseumSlide])} className="grid w-full cursor-zoom-in place-items-center" aria-label={`Открыть фото: ${microMuseumSlides[microMuseumSlide].title}`}>
                                                                    <img key={microMuseumSlides[microMuseumSlide].src} src={microMuseumSlides[microMuseumSlide].src} alt={microMuseumSlides[microMuseumSlide].title} className="max-h-80 w-full object-contain transition duration-300" />
                                                                </button>
                                                            </div>
                                                            <p className="mt-3 text-sm leading-relaxed text-gray-600">{microMuseumSlides[microMuseumSlide].description}</p>
                                                            <div className="mt-3 flex justify-center gap-2" aria-label="Выбор слайда">
                                                                {microMuseumSlides.map((slide, slideIndex) => <button key={slide.title} type="button" onClick={() => setMicroMuseumSlide(slideIndex)} className={`h-2.5 rounded-full transition-all ${microMuseumSlide === slideIndex ? 'w-7 bg-[#14B7E0]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} aria-label={`Показать ${slide.title}`} aria-current={microMuseumSlide === slideIndex ? 'true' : undefined} />)}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    <ArrowDown split />
                                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
                                                        <Card title="Методы окраски" accent="orange">
                                                            <p><strong>Рутинные:</strong> гематоксилин-эозин (H&amp;E) — для общей оценки структуры ткани.</p>
                                                            <p><strong>Специальные (гистохимия):</strong> по Ван Гизону, Маллори, трихром по Массону, PAS-реакция, окраска на жиры, амилоид, железо и другие — для выявления конкретных веществ и структур.</p>
                                                            <p><strong>Иммуногистохимия (ИГХ):</strong> иммунопероксидазная и иммунофлуоресцентная окраска с широкой панелью антител (Ki-67, CD3, CD20, CD68, PCNA, виментин, десмин, цитокератины и другие) — для оценки экспрессии белков-маркеров.</p>
                                                        </Card>
                                                        <Card title="Оценка и документирование">
                                                            <p><strong>Качественная оценка:</strong> полуколичественная балльная шкала для воспалительных, дистрофических, некротических, фибропластических и опухолевых изменений.</p>
                                                            <p><strong>Количественная морфометрия:</strong> компьютерный анализ — подсчёт клеточных элементов, измерение площади поражения, объёма структур, плотности сосудов, индекса пролиферации.</p>
                                                            <p><strong>Фотодокументация:</strong> микрофотографии с подробным описанием для включения в итоговый отчёт.</p>
                                                        </Card>
                                                    </div>
                                                    <ArrowDown split />
                                                    <Card title="Архивация и цифровые сервисы" accent="orange">
                                                        <p>Стёкла и парафиновые блоки хранятся для ретроспективных проверок. Микропрепараты сканируются, формируя цифровой архив для удалённого просмотра и совместного обсуждения.</p>
                                                    </Card>
                                                </section>
                                            )
                                        }
                                        if (block.kind === 'pharmacokinetics-flow') {
                                            return (
                                                <section key={index} className="rounded-3xl bg-gradient-to-b from-[#eef8fb] to-white p-4 sm:p-7" aria-label="Направления фармакокинетических исследований">
                                                    {block.sections.map((section, sectionIndex) => (
                                                        <div key={section.title}>
                                                            {sectionIndex > 0 && <div className="flex justify-center" aria-hidden="true"><svg className="h-12 w-8 text-[#14B7E0]" viewBox="0 0 32 48" fill="none"><path d="M16 2v37m0 0L7 30m9 9 9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
                                                            <section className={`overflow-hidden rounded-2xl border bg-white shadow-md ${sectionIndex % 2 === 0 ? 'border-[#F28F20]/40' : 'border-[#14B7E0]/40'}`}>
                                                                <h2 className={`px-5 py-4 text-lg font-bold text-white ${sectionIndex % 2 === 0 ? 'bg-gradient-to-r from-[#F28F20] to-[#e07d10]' : 'bg-gradient-to-r from-[#146FA8] to-[#14B7E0]'}`}>{section.title}</h2>
                                                                <div className="space-y-4 p-5 text-sm leading-relaxed text-gray-700 sm:p-6">
                                                                    {section.blocks.map((sectionBlock, blockIndex) => {
                                                                        if (sectionBlock.kind === 'paragraph') return <p key={blockIndex} className="text-justify">{sectionBlock.text}</p>
                                                                        if (sectionBlock.kind === 'heading') return <h3 key={blockIndex} className="text-base font-bold text-gray-900">{sectionBlock.text}</h3>
                                                                        if (sectionBlock.kind === 'list') return <ul key={blockIndex} className="space-y-2">{sectionBlock.items.map((item, itemIndex) => <li key={itemIndex} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F28F20]"/><span>{item}</span></li>)}</ul>
                                                                        if (sectionBlock.kind === 'image') return <figure key={blockIndex} className="text-center"><img src={sectionBlock.src} alt={sectionBlock.alt} className="mx-auto max-w-full rounded-xl shadow-md"/><figcaption className="mt-3 text-xs italic text-gray-600">{sectionBlock.caption}</figcaption></figure>
                                                                        return null
                                                                    })}
                                                                </div>
                                                            </section>
                                                        </div>
                                                    ))}
                                                </section>
                                            )
                                        }
                                        if (block.kind === 'pharmacokinetics-services') {
                                            return (
                                                <section key={index} className="space-y-5" aria-label="Направления фармакокинетических исследований">
                                                    {block.items.map((item) => (
                                                        <article key={item.title} className="group overflow-hidden rounded-2xl border border-[#F28F20]/40 bg-white shadow-md">
                                                            <div className="block bg-gradient-to-r from-[#F28F20] to-[#e07d10] px-5 py-4 text-white">
                                                                <h2 className="text-lg font-bold leading-snug">{item.title}</h2>
                                                            </div>
                                                            {item.details && (
                                                                <div className="pharmacokinetics-card__details bg-white">
                                                                    <div className="pharmacokinetics-card__details-inner overflow-hidden">
                                                                        <ul className="list-disc space-y-4 p-5 pl-10 text-sm leading-relaxed text-gray-700 marker:text-[#F28F20] sm:p-6 sm:pl-11">
                                                                            {item.details.map((detail) => <li key={detail} className="pl-1">{detail}</li>)}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </article>
                                                    ))}
                                                </section>
                                            )
                                        }
                                        if (block.kind === 'regulations') {
                                            return (
                                                <section key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                                    <div className="immuno-regulations__head"><h2>{block.title}</h2></div>
                                                    <div className="p-5 sm:p-6">
                                                        <ol className="list-decimal space-y-3 pl-5 text-sm italic leading-relaxed text-gray-700">
                                                            {block.items.map((item, itemIndex) => <li key={itemIndex} className="pl-1">{item}</li>)}
                                                        </ol>
                                                    </div>
                                                </section>
                                            )
                                        }
                                        return (
                                            <figure key={index} className="text-center">
                                                <img src={block.src} alt={block.alt} className="mx-auto max-w-full rounded-lg shadow-md" />
                                                <figcaption className="mt-3 text-sm italic text-gray-600">{block.caption}</figcaption>
                                            </figure>
                                        )
                                    })}
                                </div>

                                {note && (
                                    <div className="mt-8 rounded-xl border border-[#14B7E0]/30 bg-[#14B7E0]/5 px-5 py-4 leading-relaxed">
                                        {note}
                                    </div>
                                )}

                            </div>
                        </div>
                    </article>
                </div>
            </main>

            {openedPhoto && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label={openedPhoto.title} onClick={() => setOpenedPhoto(null)}>
                    <div className="relative flex max-h-full max-w-7xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
                        <button type="button" onClick={() => setOpenedPhoto(null)} className="absolute right-2 top-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-2xl text-white shadow-lg transition hover:bg-[#F28F20]" aria-label="Закрыть фото">×</button>
                        <img src={openedPhoto.src} alt={openedPhoto.title} className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl" />
                        <p className="mt-3 rounded-full bg-black/60 px-4 py-2 text-center text-sm font-medium text-white">{openedPhoto.title}</p>
                    </div>
                </div>
            )}

            <SiteFooter lang={lang} />

            <ScrollToTop />
        </div>
    )
}
