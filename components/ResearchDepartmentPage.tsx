'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'

export type ResearchBlock =
    | { kind: 'heading'; text: string }
    | { kind: 'paragraph'; text: string }
    | { kind: 'list'; items: string[] }
    | { kind: 'publications'; title: string; items: string[] }
    | { kind: 'diagnostics-services'; title: string; items: string[] }
    | { kind: 'equipment-link' }
    | { kind: 'image'; src: string; alt: string; caption: string }

type Props = {
    active: 'development' | 'pharmacokinetics' | 'immunogenicity' | 'diagnostics' | 'equipment'
    title: string
    blocks: ResearchBlock[]
    note?: string
}

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
    { href: '/vakansii', title: 'Вакансии' },
    { href: '/doklinicheskie-issledovaniya', title: 'Доклинические исследования' },
    { href: '/immunogennost-aktivnost', title: 'Иммуноактивность', id: 'immunogenicity' },
    { href: '/gruppa-gistologii-i-patomorfologii', title: 'Лаборатория гистологии и патоморфологии' },
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },
    { href: '/farmacevticheskaya-razrabotka', title: 'Фармацевтическая разработка', id: 'development' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Отдел лабораторной диагностики', id: 'diagnostics' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные' },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/farmakokinetika', title: 'Фармакокинетика', id: 'pharmacokinetics' },
    { href: '/oborudovanie-otdela', title: 'Оборудование отдела', id: 'equipment' },
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
    const t = translations[lang]

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
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    <div className="lg:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200">
                            <span className="font-semibold text-gray-900">Меню раздела</span>
                            <svg className={`w-5 h-5 text-gray-500 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {sidebarOpen && <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">{sectionMenu}</div>}
                    </div>

                    <aside className="hidden lg:block w-72 flex-shrink-0">
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
                                            return <h2 key={index} className="text-xl font-bold text-gray-900 mb-4">{block.text}</h2>
                                        }
                                        if (block.kind === 'paragraph') {
                                            return <p key={index} className="text-justify leading-relaxed">{block.text}</p>
                                        }
                                        if (block.kind === 'list') {
                                            return (
                                                <ul key={index} className="space-y-2">
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
                                        if (block.kind === 'equipment-link') {
                                            return (
                                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                                    <div className="px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5">
                                                        <h2 className="font-semibold text-gray-900">Оборудование отдела</h2>
                                                    </div>
                                                    <div className="px-5 py-4 border-t border-gray-100">
                                                        <Link href="/oborudovanie-otdela" className="text-[#F28F20] font-medium hover:underline">Перейти к перечню оборудования →</Link>
                                                    </div>
                                                </div>
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

                                {active !== 'equipment' && active !== 'diagnostics' && !blocks.some((block) => block.kind === 'equipment-link') && (
                                    <div className="mt-8 text-right">
                                        <Link href="/oborudovanie-otdela" className="text-[#F28F20] font-medium hover:underline">Оборудование отдела →</Link>
                                    </div>
                                )}
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
                                <li><Link href="/o-nas" className="hover:text-[#F28F20] transition">{t.footerAbout}</Link></li>
                                <li><Link href="/category/news" className="hover:text-[#F28F20] transition">{t.footerNews}</Link></li>
                                <li><Link href="/kontakty" className="hover:text-[#F28F20] transition">{t.footerContacts}</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerOurContacts}</h3>
                            <div className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                                <p><a href={`tel:${t.phone}`} className="hover:text-[#F28F20] transition font-medium">{t.phone}</a></p>
                                <p><a href={`mailto:${t.email}`} className="hover:text-[#F28F20] transition">{t.email}</a></p>
                                <p>{t.footerAddress}</p>
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
