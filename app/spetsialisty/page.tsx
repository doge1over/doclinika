'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'
import { useManagedSection } from '@/lib/useManagedSection'

const menuItems = [
    { href: '/o-nas', title: 'О нас' },
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
    { href: '/spetsialisty', title: 'Специалисты', active: true },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

interface Staff {
    position: string; name: string; hirsch?: number; img: string; elibrary?: string
    education?: string; specialty?: string; hirschScopus?: number; hirschWos?: number; orcid?: string; scopusId?: string
}

const leadership: Staff[] = [
    { position: 'Директор', name: 'Макарова Марина Николаевна', hirsch: 23, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Makarova-MN-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=214215', education: 'Врач, доктор медицинских наук по специальности 13.03.06 – фармакология, клиническая фармакология', specialty: 'Биохимия, фармакология и клиническая фармакология', hirschScopus: 12, hirschWos: 7, orcid: '0000-0003-3176-6386', scopusId: '22951358800' },
    { position: 'Научный руководитель', name: 'Макаров Валерий Геннадьевич', hirsch: 37, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Makarov-VG-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=80054', education: 'Врач, профессор, доктор медицинских наук по специальностям 14.00.16 – патологическая физиология, 14.00.25 – фармакология, клиническая фармакология', specialty: 'Биохимия, фармакология и клиническая фармакология, патофизиология', hirschScopus: 28, hirschWos: 20, orcid: '0000-0002-2447-7888', scopusId: '7401690256' },
    { position: 'Заместитель директора по науке', name: 'Крышень Кирилл Леонидович', hirsch: 10, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Kryshen-KL-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=180291', education: 'Магистр физики, специализация «биофизика», кандидат биологических наук, 14.03.06 – фармакология, клиническая фармакология, 03.01.04 – биохимия', specialty: 'Фармакология и клиническая фармакология, биохимия', orcid: '0000-0003-1451-7716', scopusId: '56955546200' },
]

const vetService: Staff[] = [
    { position: 'Главный ветеринарный врач', name: 'Акимов Дмитрий Юрьевич', hirsch: 17, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Akimov-DJu-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=789138', education: 'Ветеринарно-санитарный врач', specialty: 'Ветеринарно-санитарная экспертиза', orcid: '0000-0003-3141-492X' },
]

const departmentHeads: Staff[] = [
    { position: 'Руководитель отдела гистологии и патоморфологии', name: 'Гущин Ярослав Александрович', hirsch: 11, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Gushhin-YaA-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=792971', education: 'Врач', orcid: '0000-0002-7656-991X' },
    { position: 'Руководитель отдела специфической токсикологии и микробиологии', name: 'Кательникова Анастасия Евгеньевна', hirsch: 8, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Katelnikova-A-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=795341', education: 'Врач, кандидат медицинских наук по специальностям 14.03.06 – фармакология, клиническая фармакология, 03.01.04 – биохимия', specialty: 'Фармакология и клиническая фармакология, биохимия', orcid: '0000-0003-3203-9869' },
    { position: 'Руководитель отдела экспериментальной фармакологии и токсикологии', name: 'Султанова Кира Тимуровна', hirsch: 8, img: 'https://doclinika.ru/wp-content/uploads/2023/03/Sultanova-K.T-683x1024.jpg', elibrary: 'https://www.elibrary.ru/author_items.asp?authorid=999994', education: 'Врач-биохимик, кандидат медицинских наук, 14.03.06 – фармакология, клиническая фармакология', specialty: 'Фармакология и клиническая фармакология', orcid: '0000-0002-9846-8335' },
    { position: 'Руководитель научно-методической группы', name: 'Ковалева Мария Александровна', hirsch: 10, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Kovaleva-MA-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=650159', education: 'Провизор, кандидат биологических наук, 14.03.06 – фармакология, клиническая фармакология, 03.01.04 – биохимия', specialty: 'Фармакология и клиническая фармакология, биохимия', hirschScopus: 4, hirschWos: 4, orcid: '0000-0002-0740-9357', scopusId: '36523050900' },
    { position: 'Руководитель лаборатории микробиологии', name: 'Боровкова Кристина Евгеньевна', hirsch: 4, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Borovkova-K-683x1024.jpg', elibrary: 'https://www.elibrary.ru/author_items.asp?authorid=1071862', education: 'Магистр биотехнологии', specialty: 'Биология, молекулярная и клеточная биотехнология', orcid: '0000-0003-1571-6549' },
    { position: 'Руководитель отдела технологии, кинетики и анализа ЛС', name: 'Карлина Марина Валерьевна', hirsch: 10, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Karlina-MV-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=199238', education: 'Провизор, кандидат биологических наук, 14.03.06 – фармакология, клиническая фармакология', specialty: 'Фармакология и клиническая фармакология', hirschScopus: 6, orcid: '0000-0002-6292-8934' },
    { position: 'Зам. руководителя отдела технологии, кинетики и анализа ЛС', name: 'Косман Вера Михайловна', hirsch: 18, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Kosman-VM-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=96817', education: 'Провизор, кандидат химических наук по специальности 15-00-02 фармацевтическая химия и фармакогнозия', specialty: 'Фармацевтическая химия и фармакогнозия', hirschScopus: 12, hirschWos: 7, orcid: '0000-0001-9690-1935' },
    { position: 'Руководитель отдела лабораторной диагностики', name: 'Мирошников Михаил Владимирович', hirsch: 9, img: 'https://doclinika.ru/wp-content/uploads/2023/12/Miroshnikov-M.V.-683x1024.jpg', elibrary: 'https://www.elibrary.ru/author_items.asp?authorid=1000008', education: 'Врач-биохимик, кандидат медицинских наук, 14.03.06 – фармакология, клиническая фармакология', specialty: 'Фармакология и клиническая фармакология', orcid: '0000-0002-9828-3242' },
    { position: 'Зам. руководителя отдела технологии, кинетики и анализа ЛС', name: 'Фаустова Наталия Михайловна', hirsch: 9, img: 'https://doclinika.ru/wp-content/uploads/2022/01/Faustova-NM-683x1024.jpg', elibrary: 'https://www.elibrary.ru/author_items.asp?authorid=793635', education: 'Магистр техники и технологий, кандидат химических наук по специальности 05.21.03 – технология и оборудование химической переработки биомассы дерева; химия древесины', specialty: 'Технология и оборудование химической переработки биомассы дерева; химия древесины', hirschScopus: 4, hirschWos: 4, orcid: '0000-0002-5557-1287' },
]

const supportServices: Staff[] = [
    { position: 'Руководитель провизорской службы', name: 'Кищенко Наталья Александровна', hirsch: 1, img: 'https://doclinika.ru/wp-content/uploads/2022/01/Kishhenko-NA-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=214215', education: 'Провизор-менеджер', specialty: 'Управление и экономика фармации', orcid: '0000-0002-6785-2270' },
    { position: 'Руководитель службы качества', name: 'Ходько Светлана Владимировна', hirsch: 7, img: 'https://doclinika.ru/wp-content/uploads/2022/01/Hodko-SV-2-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=856239', education: 'Врач, кандидат медицинских наук по специальностям 14.03.06 – фармакология, клиническая фармакология, 14.03.03 – патологическая физиология', specialty: 'Фармакология и клиническая фармакология, патофизиология', orcid: '0000-0002-6935-075X' },
    { position: 'Руководитель экономической службы', name: 'Бикчурина Елена Владимировна', img: 'https://doclinika.ru/wp-content/uploads/2021/02/Bikchurina-EV-683x1024.jpg', education: 'Экономист', specialty: 'Бухгалтерский учет и аудит, квалификация экономист' },
    { position: 'Технический директор', name: 'Кильдибеков Кирилл Юрьевич', hirsch: 2, img: 'https://doclinika.ru/wp-content/uploads/2021/02/Kildibekov-KJu-683x1024.jpg', elibrary: 'https://elibrary.ru/author_items.asp?authorid=214215', education: 'Инженер', specialty: 'Динамика полета и управление движением летательных аппаратов', orcid: '0000-0002-0696-6987' },
]

function StaffModal({ person, onClose }: { person: Staff; onClose: () => void }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
            <div style={{ position: 'relative', background: 'white', borderRadius: '16px', maxWidth: '750px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'row' }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Photo left — same 2:3 aspect as cards */}
                <div style={{ width: '240px', minHeight: '360px', flexShrink: 0, overflow: 'hidden', borderRadius: '16px 0 0 16px', background: '#f9fafb' }}>
                    <img src={person.img} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                </div>

                {/* Info right */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', maxHeight: '90vh' }}>
                    <p style={{ fontSize: '12px', color: '#146FA8', fontWeight: 600, margin: '0 0 4px' }}>{person.position}</p>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>{person.name}</h2>

                    {person.education && (
                        <div style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, margin: '0 0 2px' }}>Образование:</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{person.education}</p>
                        </div>
                    )}
                    {person.specialty && (
                        <div style={{ marginBottom: '12px' }}>
                            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, margin: '0 0 2px' }}>Специальность:</p>
                            <p style={{ fontSize: '13px', color: '#374151', margin: 0, lineHeight: 1.5 }}>{person.specialty}</p>
                        </div>
                    )}

                    {(person.hirsch !== undefined || person.hirschScopus !== undefined || person.hirschWos !== undefined) && (
                        <div style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' }}>
                            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, margin: '0 0 6px' }}>На 12.2025:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {person.hirsch !== undefined && <span style={{ fontSize: '13px', color: '#111827' }}>РИНЦ: <strong>{person.hirsch}</strong></span>}
                                {person.hirschScopus !== undefined && <span style={{ fontSize: '13px', color: '#111827' }}>Scopus: <strong>{person.hirschScopus}</strong></span>}
                                {person.hirschWos !== undefined && <span style={{ fontSize: '13px', color: '#111827' }}>WoS: <strong>{person.hirschWos}</strong></span>}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {person.orcid && (
                            <a href={`https://orcid.org/${person.orcid}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '4px 10px', color: '#166534', textDecoration: 'none' }}>ORCID {person.orcid}</a>
                        )}
                        {person.scopusId && (
                            <a href={`https://www.scopus.com/authid/detail.uri?authorId=${person.scopusId}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '4px 10px', color: '#1e40af', textDecoration: 'none' }}>Scopus ID {person.scopusId}</a>
                        )}
                        {person.elibrary && (
                            <a href={person.elibrary} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '6px', padding: '4px 10px', color: '#92400e', textDecoration: 'none' }}>eLibrary</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StaffCard({ person, onClick }: { person: Staff; onClick: () => void }) {
    return (
        <div onClick={onClick} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#F28F20] hover:shadow-md transition-all" style={{ cursor: 'pointer' }}>
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', background: '#f9fafb' }}>
                <img src={person.img} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} loading="lazy" />
            </div>
            <div style={{ padding: '12px' }}>
                <p style={{ fontSize: '12px', color: '#146FA8', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.3 }}>{person.position}</p>
                <p style={{ fontSize: '14px', color: '#111827', fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>{person.name}</p>
                {person.hirsch !== undefined && (
                    <p style={{ fontSize: '12px', color: '#14B7E0', margin: 0 }}>Индекс Хирша РИНЦ – {person.hirsch}</p>
                )}
            </div>
        </div>
    )
}

function SectionBlock({ title, staff, columns = 3 }: { title: string; staff: Staff[]; columns?: number }) {
    const [selected, setSelected] = useState<Staff | null>(null)
    return (
        <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#F28F20] rounded-full"></span>
                {title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '16px' }}>
                {staff.map((p, i) => <StaffCard key={i} person={p} onClick={() => setSelected(p)} />)}
            </div>
            {selected && <StaffModal person={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}

export default function Spetsialisty() {
    const managedStaff = useManagedSection<Staff & { _group?: string }>('specialists', [
        ...leadership.map(x => ({...x, _group:'leadership'})), ...vetService.map(x => ({...x, _group:'vetService'})),
        ...departmentHeads.map(x => ({...x, _group:'departmentHeads'})), ...supportServices.map(x => ({...x, _group:'supportServices'})),
    ])
    const staffGroup = (group: string) => managedStaff.filter(x => x._group === group)
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
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
                                {mobileMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
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

            <div className="bg-white border-b border-[#F28F20]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-[#F28F20] transition">Главная</Link>
                        <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-gray-900 font-medium">Специалисты</span>
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
                                    {menuItems.map((item, index) => item.external ? (
                                        <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>
                                    ) : (
                                        <Link key={index} href={item.href} className={`block px-4 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>
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
                                {menuItems.map((item, index) => item.external ? (
                                    <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] transition">{item.title}</a>
                                ) : (
                                    <Link key={index} href={item.href} className={`block px-5 py-2.5 text-sm transition ${item.active ? 'bg-[#F28F20]/10 text-[#F28F20] font-medium border-l-4 border-[#F28F20]' : 'text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20]'}`}>{item.title}</Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <article className="flex-1 min-w-0">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #F28F20, #e07d10)' }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Специалисты</h1>
                            </div>
                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-10">
                                <SectionBlock title="Руководство" staff={staffGroup('leadership')} columns={3} />
                                <SectionBlock title="Руководитель ветеринарной службы" staff={staffGroup('vetService')} columns={3} />
                                <SectionBlock title="Руководители отделов и лабораторий" staff={staffGroup('departmentHeads')} columns={3} />
                                <SectionBlock title="Вспомогательные службы" staff={staffGroup('supportServices')} columns={3} />
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
