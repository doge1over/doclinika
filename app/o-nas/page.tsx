'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { useManagedSection } from '@/lib/useManagedSection'

const menuItems = [
    { href: '/o-nas', title: 'О нас', active: true },
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
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const events = [
    { year: '1991', title: 'Межрегиональный центр «Адаптоген»', text: 'На базе кафедры биохимии СПбГМА им. И.И. Мечникова создаётся Межрегиональный центр «Адаптоген», который занимался химико-аналитическими исследованиями, разработкой нормативной документации на лекарственные препараты, технологией лекарственных средств.', color: '#F28F20' },
    { year: '1997', title: 'Конференция «Фитофарм»', text: 'Межрегиональный центр «Адаптоген» начинает проводить ежегодную конференцию «Фитофарм».', color: '#14B7E0' },
    { year: '2007', title: 'Санкт-Петербургский институт фармации', text: 'Создание «Санкт-Петербургского института фармации».', color: '#146FA8' },
    { year: '2010', title: 'НПО «Дом Фармации»', text: 'Создание НПО «Дом Фармации» и начало строительства собственного здания.', color: '#F28F20' },
    { year: '2010', title: 'Это Миса пробник', text: 'Она забавная', color: '#F28F20', image: '/images/timeline/5221983279462949067.jpg', caption: 'Миса' },
    { year: '2011', title: 'Институт экспериментальной фармакологии', text: 'Создание «Института экспериментальной фармакологии».', color: '#14B7E0' },
    { year: '2013', title: 'Объединение институтов', text: 'Четыре организации объединены в группу научно-исследовательских институтов.', color: '#146FA8' },
    { year: '2013', title: 'Это Тиша', text: 'Она больше Мисы, но это не вся информация', color: '#14B7E0', image: '/images/timeline/5221983279462949070.jpg', caption: 'Тиша' },
]

type TimelineCategory = 'animals' | 'administrative' | 'publications' | 'quality'
type TimelineEvent = (typeof events)[number] & { id?: string; category?: TimelineCategory }

const eventCategory = (event: TimelineEvent): TimelineCategory => {
    if ('category' in event && ['animals', 'administrative', 'publications', 'quality'].includes(String(event.category))) return event.category as TimelineCategory
    if ('image' in event) return 'animals'
    if (event.year === '1997') return 'publications'
    if (event.year === '2013') return 'quality'
    return 'administrative'
}

const timelineFilters: { id: TimelineCategory; label: string }[] = [
    { id: 'animals', label: 'Животные' },
    { id: 'administrative', label: 'Развитие компании' },
    { id: 'publications', label: 'Научные публикации' },
    { id: 'quality', label: 'Система менеджмента качества (СМК)' },
]

function TimelineFilterIcon({ category }: { category: TimelineCategory }) {
    if (category === 'animals') return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="16" rx="5.2" ry="4.3" /><circle cx="6.4" cy="10.2" r="2.1" /><circle cx="10.2" cy="6.8" r="2.1" /><circle cx="14.6" cy="6.8" r="2.1" /><circle cx="18" cy="10.4" r="2.1" /></svg>
    if (category === 'administrative') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></svg>
    if (category === 'publications') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c3.6 2.7 8.4 2.7 12 0v-4.5M22 9v7" /></svg>
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m7.5 12 3 3 6-6" /></svg>
}

function AlternatingTimeline({ items = events }: { items?: TimelineEvent[] }) {
    const [activeFilter, setActiveFilter] = useState<TimelineCategory | 'all'>('all')
    const [openedPhoto, setOpenedPhoto] = useState<{ src: string; alt: string } | null>(null)
    const orderedEvents = [...items].sort((a, b) => {
        const yearDifference = Number(a.year || 0) - Number(b.year || 0)
        return yearDifference || items.indexOf(a) - items.indexOf(b)
    })
    const visibleEvents = activeFilter === 'all'
        ? orderedEvents
        : orderedEvents.filter((event) => eventCategory(event) === activeFilter)

    return (
        <section className="company-history" aria-labelledby="history-title">
            <div className="company-history__intro">
                <span className="company-history__eyebrow">Наш путь</span>
                <h2 id="history-title">История компании</h2>
                <p>Более тридцати лет развиваем научную экспертизу и инфраструктуру для фармацевтических исследований.</p>
            </div>

            <div className="company-history__filter-panel">
                <span className="company-history__filter-label">Показать:</span>
                <div className="company-history__filters" role="group" aria-label="Фильтры событий таймлайна">
                <button type="button" className={activeFilter === 'all' ? 'is-active is-all' : 'is-all'} aria-pressed={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
                    Все события
                </button>
                {timelineFilters.map((filter) => {
                    const isActive = activeFilter === filter.id
                    return <button key={filter.id} type="button" className={isActive ? 'is-active' : ''} aria-pressed={isActive} onClick={() => setActiveFilter(filter.id)}>
                        <span>{filter.label}</span>
                    </button>
                })}
                </div>
            </div>

            <div className="company-history__timeline">
                {visibleEvents.map((event, visibleIndex) => {
                    const timelineIndex = orderedEvents.indexOf(event)
                    const previousVisibleEvent = visibleEvents[visibleIndex - 1]
                    const showYear = Boolean(event.year) && (!previousVisibleEvent || previousVisibleEvent.year !== event.year)
                    return (
                    <article className={`company-history__event company-history__event--${eventCategory(event)}`} key={event.id || `${event.year}-${timelineIndex}-${event.title}`} style={{ '--event-color': event.color } as React.CSSProperties}>
                        {showYear && <div className="company-history__year" aria-hidden="true"><span>{event.year}</span></div>}
                        <div className={`company-history__marker company-history__marker--${eventCategory(event)}`}>
                            <span>
                                <TimelineFilterIcon category={eventCategory(event)} />
                            </span>
                        </div>
                        <div className="company-history__content">
                            <span className="company-history__number">{String(timelineIndex + 1).padStart(2, '0')}</span>
                            {'image' in event && event.image && <button type="button" className="company-history__photo-button" onClick={() => setOpenedPhoto({ src: event.image, alt: event.caption || event.title })} aria-label={`Открыть фотографию: ${event.caption || event.title}`}>
                                <img className="company-history__event-image" src={event.image} alt={event.caption} />
                                <span className="company-history__photo-hint">Увеличить</span>
                            </button>}
                            <h3>{event.title}</h3>
                            {event.text && <p>{event.text}</p>}
                        </div>
                    </article>)
                })}
            </div>
            {openedPhoto && <div className="company-history__lightbox" role="dialog" aria-modal="true" aria-label={openedPhoto.alt} onClick={() => setOpenedPhoto(null)}>
                <button type="button" className="company-history__lightbox-close" onClick={() => setOpenedPhoto(null)} aria-label="Закрыть фотографию">×</button>
                <img src={openedPhoto.src} alt={openedPhoto.alt} onClick={(event) => event.stopPropagation()} />
            </div>}
        </section>
    )
}

export default function ONas() {
    const managedEvents = useManagedSection<TimelineEvent>('about', events)
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
                            <Link href="/o-nas" className="block px-4 py-2 text-[#F28F20] bg-[#F28F20]/10 font-medium rounded-lg">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Контакты</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <div className="px-4 py-2 space-y-2">
                                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-gray-700"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span className="font-medium">{t.phone}</span></a>
                                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-500 text-sm"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>{t.email}</span></a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className="bg-white border-b border-[#F28F20]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">О нас</span>
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

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">О нас</h1>
                            </div>
                            <div className="px-5 py-8 sm:px-8 sm:py-10">
                                <AlternatingTimeline items={managedEvents} />
                            </div>
                        </div>
                    </article>
                </div>
            </main>

            <SiteFooter lang={lang} />

            <ScrollToTop />
        </div>
    )
}
