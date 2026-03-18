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
    { href: '/mikrobiologicheskaya-laboratoriya', title: 'Отдел микробиологии' },
    { href: '/tehnologiya-i-farmakokinetika', title: 'Разработка лекарственных форм' },
    { href: '/gruppa-biohimii-i-gematologii', title: 'Лаборатория биохимии и гематологии' },
    { href: '/laboratornye-zhivotnye', title: 'Лабораторные животные', active: true },
    { href: 'http://labanimalsjournal.ru/ru/contents/2018/2', title: 'Журнал «Лабораторные животные»', external: true },
    { href: '/innovatsionnaya-deyatelnost', title: 'Фармакокинетика, токсикокинетика, биоэквивалентность' },
    { href: '/obespechenie-kachestva', title: 'Обеспечение качества' },
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба' },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const animals = [
    {
        name: 'Мыши', latin: 'Muridae Mus',
        img: '/images/animals/Mysh-scaled-1-768x1023.jpg',
        breeds: 'ICR (CD1), Balb/с, другие линии доступны по предзаказу (поставка от проверенных поставщиков)',
        usage: ['Токсикология', 'Фармакология', 'Большой спектр модельных заболеваний'],
        capacity: '1500 голов',
    },
    {
        name: 'Хомяки сирийские', latin: 'Cricetidae',
        img: '/images/animals/Homyak-scaled-1-768x1023.jpg',
        breeds: '',
        usage: ['Токсикология', 'Фармакология', 'Большой спектр модельных заболеваний'],
        capacity: '1200 голов',
    },
    {
        name: 'Песчанки аутбредные', latin: 'Muridae Gerbillinae',
        img: '/images/animals/Peschanka-scaled-1-768x1023.jpg',
        breeds: '',
        usage: ['Фармакология. Используют преимущественно для моделирования инсульта, диабета, ожирения, язвы желудка индуцированной Helicobacter pylori, воспалительных заболеваний'],
        capacity: '200 голов',
    },
    {
        name: 'Морские свинки', latin: 'Cavia',
        img: '/images/animals/morskaya-svinka-scaled-1-768x1023.jpg',
        breeds: '',
        usage: ['Специфические виды токсичности', 'Модельные заболевания, связанные с гиперреактивным иммунным ответом'],
        capacity: '500 голов',
    },
    {
        name: 'Кролики', latin: 'Leporidae Oryctolagus',
        img: '/images/animals/Krolik-scaled-1-768x1023.jpg',
        breeds: 'Новозеландские, Калифорнийские, Советская Шиншилла',
        usage: ['Токсикология (преимущественно при изучении готовых лекарственных форм без разрушения целостности таблетки/капсулы)', 'Фармакокинетика', 'Фармакология (моделирование атеросклероза, тромбозов, заболеваний опорно-двигательного аппарата, глаз, инфекционных заболеваний)', 'Для наработки антител'],
        capacity: '600 голов',
    },
    {
        name: 'Карликовые свиньи', latin: 'Sus salvanius',
        img: '/images/animals/Karlikovaya-svinya-scaled-1-768x1023.jpg',
        breeds: 'Вьетнамская вислобрюхая',
        usage: ['Токсикология (длительная хроническая токсичность, уточнение органов-мишеней, пересчёт доз для I фазы клинических испытаний)', 'Иммуногенность биофармацевтических препаратов', 'Фармакокинетика', 'Фармакология (заболевания сердечно-сосудистой системы, кожи, метаболические нарушения, стоматология)'],
        capacity: '100 голов',
    },
    {
        name: 'Хорьки аутбредные', latin: 'Mustela putorius furo',
        img: '/images/animals/Horek-scaled-1-768x1023.jpg',
        breeds: '',
        usage: ['Токсикология', 'Канцерогенность', 'Фармакология (моделирование инфекционных заболеваний — грипп, корь; сердечно-сосудистые заболевания; рвота, кашель; патология органов слуха и зрения; химиотерапия)'],
        capacity: '200 голов',
    },
    {
        name: 'Кошки', latin: 'Felis catus',
        img: '/images/animals/Kot-scaled-1-768x1023.jpg',
        breeds: 'Русская голубая',
        usage: ['Токсикология', 'Фармакокинетика', 'Изучение фармакологической безопасности лекарственных препаратов'],
        capacity: '20 голов',
    },
    {
        name: 'Собаки – Бигли', latin: 'Canis familiaris Beagle',
        img: '/images/animals/Sobaka-768x1024.jpg',
        breeds: 'Бигль',
        usage: ['Токсикология', 'Фармакокинетика', 'Изучение фармакологической безопасности лекарственных препаратов'],
        capacity: '60 голов',
    },
    {
        name: 'Макаки-крабоеды', latin: 'Macaca fascicularis',
        img: '/images/animals/Kraboed-1-768x1023.jpg',
        breeds: '',
        usage: ['Токсикология', 'Фармакокинетика', 'Изучение фармакологической безопасности лекарственных препаратов', 'Фармакология'],
        capacity: '90 голов',
    },
    {
        name: 'Игрунки обыкновенные', latin: 'Callithrix jacchus',
        img: '/images/animals/Igrunka-1-768x1023.jpg',
        breeds: '',
        usage: ['Токсикология', 'Фармакокинетика', 'Изучение фармакологической безопасности лекарственных препаратов', 'Фармакология'],
        capacity: '100 голов',
    },
    {
        name: 'Крысы', latin: 'Muridae Rattus',
        img: '/images/animals/rat-768x1023.jpg',
        breeds: 'Wistar, другие линии доступны по предзаказу (поставка от проверенных поставщиков)',
        usage: ['Токсикология', 'Фармакология', 'Большой спектр модельных заболеваний'],
        capacity: '2500 голов',
    },
]

const facilities = [
    { name: 'Виварий для грызунов', area: '550 м²' },
    { name: 'Питомник для грызунов', area: '737 м²' },
    { name: 'Участок карликовых свиней', area: '547 м²' },
    { name: 'Крольчатник', area: '360 м²' },
    { name: 'Участок хищных млекопитающих', area: '746 м²' },
    { name: 'Участок приматов', area: '746 м²' },
    { name: 'Выгульная площадка для собак', area: '155 м²' },
]

function AnimalModal({ animal, onClose }: { animal: typeof animals[0]; onClose: () => void }) {
    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />

            {/* Modal — horizontal */}
            <div
                style={{ position: 'relative', background: 'white', borderRadius: '16px', maxWidth: '750px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'row' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                >
                    <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Photo left */}
                <div style={{ width: '260px', aspectRatio: '4/5', flexShrink: 0, overflow: 'hidden', borderRadius: '16px 0 0 16px', background: '#f9fafb' }}>
                    <img src={animal.img} alt={animal.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
                </div>

                {/* Info right */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', maxHeight: '90vh' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{animal.name}</h2>
                    <p style={{ fontSize: '14px', color: '#9ca3af', fontStyle: 'italic', margin: '0 0 16px' }}>{animal.latin}</p>

                    {animal.breeds && (
                        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px', fontWeight: 600 }}>Породы / Линии:</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>{animal.breeds}</p>
                        </div>
                    )}

                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>Область использования:</p>
                    <div style={{ marginBottom: '16px' }}>
                        {animal.usage.map((u, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                                <svg style={{ width: '14px', height: '14px', color: '#F28F20', marginTop: '3px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{u}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' }}>
                        <p style={{ fontSize: '13px', color: '#111827', margin: 0 }}>
                            <strong>Одновременно доступно:</strong> {animal.capacity}
                        </p>
                    </div>

                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                        По предварительному заказу (за 3–6 месяцев) количество животных для исследования может быть увеличено в 1,5–2 раза.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function LaboratoryAnimals() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [pubsOpen, setPubsOpen] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null)
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
                        <span className="text-gray-900 font-medium">Лабораторные животные</span>
                    </nav>
                </div>
            </div>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

                    {/* Mobile Sidebar */}
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
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Лабораторные животные</h1>
                            </div>

                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

                                {/* Publications — top */}
                                <div>
                                    <button
                                        onClick={() => setPubsOpen(!pubsOpen)}
                                        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 rounded-xl border border-gray-200 transition"
                                    >
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${pubsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {pubsOpen && (
                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-[#F28F20]">
                                            <p className="text-sm text-gray-600 leading-relaxed">1. Бондарева Е.Д. и др. Разработка системы идентификации качества лабораторных животных. Контроль окружающей среды (сообщение 2) // 2025. № 2. <a href="https://labanimalsjournal.ru/index.php/ru/2618723x-2025-02-01" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">2. Бондарева Е.Д. и др. Идентификация уровня барьеров (сообщение 1) // 2025. № 1. <a href="https://labanimalsjournal.ru/ru/2618723x-2025-01-01" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">3. Бармина Т.Г. и др. Зоотехния лабораторных яванских макак (Macaca fascicularis) // 2024, № 4. <a href="https://labanimalsjournal.ru/ru/2618723x-2024-04-06" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">4. Веснина Е.В. и др. Зоотехния лабораторных хомяков // 2024, № 3. <a href="https://labanimalsjournal.ru/index.php/ru/2618723x-2024-03-02" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">5. Бармина Т.Г. и др. Зоотехния морских свинок // 2024, № 2. <a href="https://labanimalsjournal.ru/ru/2618723x-2024-02-02" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">6. Бармина Т.Г. и др. Зоотехния лабораторных песчанок // 2024, № 1. <a href="https://labanimalsjournal.ru/index.php/ru/2618723x-2024-01-02" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">7. Рекомендации по проведению некропсии лабораторных животных: монография. НПО «ДОМ ФАРМАЦИИ», 2023. <a href="https://cdn.doclinika.ru/books/Rekomendacii_po_provedeniyu_nekropsii_laboratornyh_zhivotnyh.pdf" target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline">[Ссылка]</a></p>
                                            <p className="text-sm text-gray-600 leading-relaxed">8. Рыбакова А.В., Макарова М.Н. Методы эвтаназии лабораторных животных в соответствии с европейской директивой 2010/63 // 2015, №2. С. 96-107.</p>
                                            <p className="text-sm text-gray-600 leading-relaxed">9. Справочник «Физиологические, биохимические и биометрические показатели нормы экспериментальных животных» / Под ред. В.Г. Макарова, М.Н. Макаровой. СПб: «ЛЕМА», 2013. — 116 с.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Intro */}
                                <div className="text-gray-700 leading-relaxed space-y-4">
                                    <p>Лабораторные животные используются для изучения эффективности и безопасности лекарственных препаратов. Основными условиями для правильного выбора релевантного вида лабораторного животного для исследования являются:</p>
                                    <div className="bg-[#146FA8]/5 border border-[#146FA8]/20 rounded-xl p-4 sm:p-5 space-y-2">
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#146FA8] font-bold text-sm mt-0.5">1.</span>
                                            <span className="text-sm text-gray-700">Размер животных, который определяет возможность введения и оптимизацию расхода тестируемых объектов, проведения инструментальных исследований и забора биологических образцов в достаточном объёме.</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#146FA8] font-bold text-sm mt-0.5">2.</span>
                                            <span className="text-sm text-gray-700">Сходство строения и функционирования органов и систем на молекулярном, клеточном и тканевом уровнях у человека и релевантного вида животных.</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#146FA8] font-bold text-sm mt-0.5">3.</span>
                                            <span className="text-sm text-gray-700">При исследовании фармакодинамики — подобие клинической картины моделируемой патологии у животного с таковой при заболевании у человека.</span>
                                        </div>
                                    </div>
                                    <p>Для обеспечения качества наших исследований мы используем животных либо собственного разведения, полученных в собственном Питомнике лабораторных животных, либо из проверенных источников.</p>
                                </div>

                                {/* Facilities */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#146FA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        Наши помещения
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                        {facilities.map((f, i) => (
                                            <div key={i} className="border border-gray-200 rounded-xl p-3 text-center hover:border-[#14B7E0] hover:shadow-md transition-all">
                                                <p className="text-lg font-bold text-[#146FA8]">{f.area}</p>
                                                <p className="text-xs text-gray-600 mt-1">{f.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Animals grid */}
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">На сегодняшний день для научных исследований мы располагаем:</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                        {animals.map((animal, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedAnimal(animal)}
                                                className="group border border-gray-200 rounded-xl overflow-hidden hover:border-[#F28F20] hover:shadow-md transition-all"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: '#f9fafb' }}>
                                                    <img
                                                        src={animal.img}
                                                        alt={animal.name}
                                                        className="group-hover:scale-105 transition-transform duration-300"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div style={{ padding: '12px', textAlign: 'center' }}>
                                                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '0 0 2px' }}>{animal.name}</h3>
                                                    <p style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>{animal.latin}</p>
                                                </div>
                                            </div>
                                        ))}
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
                                <p className="flex items-start gap-3"><svg className="w-4 h-4 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>188663, Россия, Ленинградская область,<br/>Всеволожский район, г.п. Кузьмоловский,<br/>Заводская улица, 3-245</span></p>
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

            {/* Modal */}
            {selectedAnimal && (
                <AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
            )}
        </div>
    )
}