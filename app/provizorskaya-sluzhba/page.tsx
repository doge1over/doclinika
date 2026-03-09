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
    { href: '/provizorskaya-sluzhba', title: 'Провизорская служба', active: true },
    { href: '/spetsialisty', title: 'Специалисты' },
    { href: '/policy', title: 'Политики' },
    { href: '/litsenzii-sertifikaty-udostovereniya', title: 'Лицензии, сертификаты, удостоверения' },
    { href: '/glavnaya', title: 'Сведения об образовательной организации' },
    { href: '/category/news', title: 'Новости' },
    { href: '/kontakty', title: 'Контакты' },
]

const publications = [
    { authors: 'Гущина С.В., Макарова М.Н., Пожарицкая О.Н.', title: 'Сравнительное токсикологическое изучение носителей для лекарственных средств, применяемых в доклинических исследованиях', journal: 'Международный вестник ветеринарии. -2015, №3. –С. 92-98.', link: '/wp-content/uploads/2014/12/Sravnitel-noe-toksikologicheskoe-izuchenie-nositelej-dlya-lekarstvenny-h-sredstv-primenyaemy-h-v-doklinicheskih-issledovaniyah.pdf' },
    { authors: 'Макаренко И.Е., Авдеева О.И., Ванатиев Г.В., Рыбакова А.В., Ходько С.В., Макарова М.Н., Макаров В.Г.', title: 'Возможные пути и объемы введения лекарственных средств лабораторным животным', journal: 'Международный вестник ветеринарии. -2013, № 3. –С. 78-84.', link: '/wp-content/uploads/2014/12/Vozmozhny-e-puti-i-ob-emy-vvedeniya-lekarstvenny-h-sredstv-laboratorny-m-zhivotny-m.pdf' },
    { authors: 'Карлина М.В., Пожарицкая О.Н., Косман В.М., Шиков А.Н., Забозлаев А.А., Макарова М.Н., Макаров В.Г.', title: 'Модель in vitro для оценки скорости растворения гидрофобных веществ из таблеток для рассасывания (lozenges) на примере коэнзима Q10, in vivo/in vitro корреляция', journal: 'Химико-фармацевтический журнал. -2012. –Т. 46, № 7. –С. 52-55.', link: '' },
    { authors: 'Косман В.М., Пожарицкая О.Н., Шиков А.Н., Гущина С.В., Макарова М.Н.', title: 'Оценка стабильности суспензий лекарственных препаратов для введения лабораторным животным', journal: 'Международный вестник ветеринарии. -2016, № [id]. –С. 71-81.', link: '/wp-content/uploads/2016/02/Otsenka-stabil-nosti-suspenzij-lekarstvenny-h-preparatov-dlya-vvedeniya-laboratorny-m-zhivotny-m.pdf' },
    { authors: 'Guschina S.V., Shapurina S.V., Pozharitskaya O.N., Shikov A.N.', title: 'Peculiarities of vehicle selection in preclinical study of the plant-based drugs', journal: 'Abstracts. Phitopharm. 2016. Obzory po klinicheskoj farmacologii i lekarstvennoj terapii. -2016. –Vol. 14. –P. 22.', link: '/wp-content/uploads/2016/02/PECULIARITIES-OF-VEHICLE-SELECTION-IN-PRECLINICAL-STUDY-OF-THE-PLANT-BASED-DRUGS.pdf' },
    { authors: 'Авдеева О.И., Макарова М.Н., Кательникова А.Е., Симановская М.С.', title: 'Оценка токсического действия некоторых носителей, используемых в доклинических исследованиях', journal: 'Международный вестник ветеринарии. -2016, № 4. –С. 79-85.', link: '/wp-content/uploads/2016/02/Otsenka-toksicheskogo-dejstviya-nekotory-h-nositelej-ispol-zuemy-h-v-doklinicheskih-issledovaniyah.pdf' },
    { authors: 'Гущина С.В., Косман В.М., Макарова М.Н., Шиков А.Н.', title: 'Доклинические исследования стабильности суспензий, приготовленных из готовых лекарственных средств', journal: 'Фармация. – 2017. –Т. 66, № 3. –С. 27-32.', link: '' },
    { authors: 'Кириченко Д.В., Пожарицкая О.Н.', title: 'Влияние вспомогательных веществ готовой лекарственной формы на выбор носителя для введения лабораторным животным', journal: 'Материалы VIII Всероссийской научной конференции «МОЛОДАЯ ФАРМАЦИЯ – ПОТЕНЦИАЛ БУДУЩЕГО». Санкт-Петербург, 2016. – С. 435-437.', link: '' },
    { authors: 'Кириченко Д.В.', title: 'Влияние физико-химических свойств компонентов препарата на выбор носителя для введения лабораторным животным', journal: 'Лабораторные животные для научных исследований. – 2020, №2.', link: 'https://labanimalsjournal.ru/ru/2618723x-2020-02-09' },
]

export default function ProvizorskayaSluzhba() {
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
                            <div className="hidden md:flex border-l-2 border-gray-300 pl-4 h-12 items-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">НПО «ДОМ ФАРМАЦИИ»</h1>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="hidden lg:flex items-center gap-3">
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на доклинические исследования</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на НИР</Link>
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
                            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 rounded-lg transition">Главная</Link>
                            <Link href="/o-nas" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 rounded-lg transition">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 rounded-lg transition">Контакты</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <div className="px-4 py-2 space-y-2">
                                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-gray-700"><span className="text-[#F28F20]">📞</span><span className="font-medium">{t.phone}</span></a>
                                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-500 text-sm"><span className="text-[#F28F20]">✉️</span><span>{t.email}</span></a>
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
                        <span className="text-gray-900 font-medium">Провизорская служба</span>
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
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: "linear-gradient(to right, #F28F20, #e07d10)" }}>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Провизорская служба</h1>
                            </div>

                            <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                                <div>
                                    <button onClick={() => setPublicationsOpen(!publicationsOpen)} className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#F28F20]/5 to-[#14B7E0]/5 hover:from-[#F28F20]/10 hover:to-[#14B7E0]/10 rounded-xl border border-gray-200 transition">
                                        <span className="font-semibold text-gray-900">Публикации по теме:</span>
                                        <svg className={`w-5 h-5 text-gray-500 transition-transform ${publicationsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {publicationsOpen && (
                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-[#F28F20]/30">
                                            {publications.map((pub, index) => (
                                                <div key={index} className="text-sm text-gray-700">
                                                    <p><span className="font-medium">{pub.authors}</span> {pub.title} {"//"} {pub.journal}{pub.link && (<a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-[#F28F20] hover:underline ml-1">[Ссылка]</a>)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                                    <p className="text-justify leading-relaxed">
                                        В соответствии с Национальным стандартом РФ <strong className="text-[#F28F20]">ГОСТ 33044-2014 «Принципы надлежащей лабораторной практики»</strong> организация располагает отдельными помещениями для обработки испытуемых и стандартных объектов, соответствующими требованиям безопасности при хранении веществ. Утилизация неизрасходованных тестируемых и стандартных объектов, поступивших в провизорскую службу, по согласованию со Спонсором, проводится на соответствующих полигонах в сопровождении природоохранных государственных унитарных предприятий.
                                    </p>

                                    <div className="bg-[#F28F20]/10 border border-[#F28F20]/30 rounded-xl p-4 sm:p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-3">Функции провизорской службы:</h3>
                                        <ul className="space-y-2 text-[#F28F20]">
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Прием и учет объектов исследования и сопроводительных документов</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Обеспечение хранения с учетом особенностей объектов</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Учет и проверка доброкачественности объектов на этапе получения и в ходе хранения</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Подготовка индивидуальных доз для введения в тест-систему</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Учет и действия с неизрасходованными в эксперименте объектами</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-[#14B7E0]/10 border border-[#14B7E0]/30 rounded-xl p-4 sm:p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-3">До начала исследования Спонсор предоставляет:</h3>
                                        <ul className="space-y-2 text-[#14B7E0]">
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#14B7E0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                <span>Исследуемые объекты и объекты сравнения (включая арбитражные образцы для каждой серии объекта и образцы для тестовой пробоподготовки)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#14B7E0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                <span>Аналитический паспорт/сертификат анализа/протокол анализа на каждую серию переданных объектов</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#14B7E0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                <span>Акт приемки-передачи</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-[#14B7E0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                <span>Правила безопасности при работе с объектами/MSDS (при наличии)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-4 my-8">
                                        <img src="/images/1-524x1024.png" alt="Провизорская служба" className="h-64 object-contain rounded-lg shadow-md" />
                                        <img src="/images/2-977x1024.jpg" alt="Провизорская служба" className="h-64 object-contain rounded-lg shadow-md" />
                                    </div>

                                    <p className="text-justify leading-relaxed">
                                        Квалифицированные и опытные специалисты провизорской службы, руководствуясь требованиями основных нормативных документов, обеспечивают учет и сохранность препаратов, преобразуют лекарственные формы для удобного дозирования лабораторным животным, а также контролируют доброкачественность исследуемых объектов на всех этапах работы.
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Приемка объектов</h2>
                                    <p className="text-justify leading-relaxed">
                                        Работа с объектами начинается с приемки. В ходе приемки сотрудники проверяют состояние поступивших объектов: осуществляется проверка состояния упаковки, внешний вид и маркировка самого объекта и наличие всей сопроводительной документации. В полученной от Спонсора сопроводительной документации должны быть указаны все основные сведения об объекте, а также сведения о режиме хранения, сведения о стабильности объекта в процессе хранения. Сотрудники провизорской службы знакомятся с паспортами безопасности для исследуемых и стандартных объектов и извещают сотрудников о мерах безопасности при работе с ними.
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Хранение объектов</h2>
                                    <p className="text-justify leading-relaxed">
                                        Сотрудники провизорской службы обеспечивают правильное хранение объектов на протяжении всего времени нахождения их в организации. При хранении объектов должно обеспечиваться соблюдение идентичности, сохранение концентрации, чистоты и стабильности. Для обеспечения хранения подразделение имеет выделенные складские помещения с ограниченным в них доступом. Складское помещение оснащено сейфом, стеллажами и фармацевтическими холодильниками с разными температурами хранения, имеется стеллаж для хранения арбитражных образцов. В помещениях и холодильниках ведется постоянный контроль показателей температуры и влажности, данные фиксируются дважды в сутки. На контейнеры, в которых осуществляется хранение объектов, наносится маркировка, с указанием кода объекта в исследовании, условий хранения и срока годности объекта.
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-4 my-8">
                                        <img src="/images/4-768x1024.jpg" alt="Хранение объектов" className="h-64 object-contain rounded-lg shadow-md" />
                                        <img src="/images/3-1024x1024.jpg" alt="Хранение объектов" className="h-64 object-contain rounded-lg shadow-md" />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Проверка стабильности</h2>
                                    <p className="text-justify leading-relaxed">
                                        Согласно OECD и ГОСТ 33044-2014 «Принципы надлежащей лабораторной практики», в случаях, когда тестируемый продукт предоставляется Спонсором, должен быть представлен механизм, разработанный в сотрудничестве между Спонсором и организацией, проводящей доклинические испытания, для установления подлинности объектов исследования. Так же должна быть определена стабильность тестируемых и контрольных объектов, как в условиях хранения, так и в условиях эксперимента. Провизорская служба по разработанным методикам проводит проверку полученных объектов на стабильность в ходе растворения и разведения носителем. Например, все суспензии, предназначенные для введения животным, проходят оценку стабильности суспензии по показателю «pH» и «содержание сухого остатка».
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Кодирование и «слепой» метод</h2>
                                    <p className="text-justify leading-relaxed">
                                        Перед началом работы с исследуемыми объектами, им присваивается индивидуальный код. Кодирование препаратов позволяет обеспечить применение <strong className="text-[#F28F20]">«слепого» метода исследования</strong> – метода, при котором сотрудникам, выполняющим введение объектов и получение данных с лабораторных животных, не известно, какой из объектов получает животное. «Слепой» метод позволяет уменьшить количество ошибок, вызванных сознательной и несознательной заинтересованностью исследователей в получении определенных результатов исследования при анализе данных. Также этот метод позволяет обеспечить четкую и понятную маркировку исследуемых объектов.
                                    </p>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Приготовление доз</h2>
                                    <p className="text-justify leading-relaxed">
                                        Для обеспечения введения лабораторным животным исследуемых объектов в удобной форме, сотрудники провизорской службы осуществляют приготовление доз для введения. Дозы готовятся <strong className="text-[#14B7E0]">экстемпорально</strong> (время хранения приготовленных растворов и суспензий не превышает 4 часов, а в особых случаях – не больше 10 минут до введения животному). Подготовка объектов к исследованию проводится в оборудованном помещении, отделённым от склада и от помещений содержания животных. Подготовка объектов исследования проводится при помощи точного и поверенного весового и мерного оборудования.
                                    </p>

                                    <div className="flex justify-center my-8">
                                        <img src="/images/5-1024x1024.jpg" alt="Приготовление доз" className="h-72 object-contain rounded-lg shadow-md" />
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Работа с неизрасходованными объектами</h2>
                                    <p className="text-justify leading-relaxed">
                                        В АО «НПО «ДОМ ФАРМАЦИИ» разработаны процедуры по работе с неизрасходованными объектами. После завершения исследования, Спонсор оповещается о неизрасходованных объектах. Неизрасходованные объекты могут быть возвращены Спонсору, либо могут быть переданы на утилизацию в специализированную компанию.
                                    </p>

                                    <div className="bg-gradient-to-r from-[#F28F20]/10 to-[#14B7E0]/10 border border-[#F28F20]/30 rounded-xl p-4 sm:p-6 mt-8">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">Лицензии и регистрация</h3>
                                        <p className="text-gray-700 text-justify leading-relaxed">
                                            Информация о лицензиях доступна на странице <Link href="/litsenzii-sertifikaty-udostovereniya" className="text-[#F28F20] hover:underline font-medium">Лицензии, сертификаты, удостоверения</Link>.
                                        </p>
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
                                <p className="flex items-center gap-3"><span className="text-[#F28F20]">✉️</span><a href={`mailto:${t.email}`} className="hover:text-[#F28F20] transition break-all">{t.email}</a></p>
                                <p className="flex items-start gap-3 leading-relaxed"><span className="text-[#F28F20] mt-0.5">📍</span><span>188663, Россия, Ленинградская область,<br/>Всеволожский район, г.п. Кузьмоловский,<br/>Заводская улица, 3-245</span></p>
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