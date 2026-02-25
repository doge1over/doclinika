'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'

export default function ZayavkaNIR() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const t = translations[lang]

    const [formData, setFormData] = useState({
        // Информация о Спонсоре
        organizationName: '',
        organizationAddress: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        applicationDate: '',

        // Информация о препарате
        drugType: '',
        dosageForm: '',
        dosage: '',
        primaryPackaging: '',
        activeSubstance: '',
        chemicalStructure: '',
        quantitativeAnalysisMethods: '',
        physicochemicalProperties: '',
        pharmacologicalGroup: '',
        storageConditions: '',
        stabilityInfo: '',
        technologyStage: '',
        productionSite: '',
        productionEquipment: '',
        pilotBatchEquipment: '',

        // Объем работ
        literatureAnalysis: '',
        patentSearch: '',
        stressTestStability: '',
        biopharmaceuticalSolubility: '',
        compatibilityStudy: '',
        methodValidation: '',
        formulationDevelopment: '',
        documentationPreparation: '',
        labSamplesProduction: '',
        stabilitySamples: '',
        technologyTransfer: '',

        // Предоставляемые материалы
        apiProvided: '',
        apiCertificate: '',
        apiDocumentation: '',
        apiStandardGSO: '',
        apiStandardForeign: '',
        apiStandardOther: '',
        impurityStandardGSO: '',
        impurityStandardForeign: '',
        impurityStandardOther: '',
        excipients: '',
        primaryPackagingProvided: '',
        referenceProduct: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
    }

    const YesNoRadio = ({ name, label }: { name: string; label: string }) => (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition">
            <span className="text-gray-700 flex-1 pr-4">{label}</span>
            <div className="flex gap-4 flex-shrink-0">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value="yes"
                        checked={formData[name as keyof typeof formData] === 'yes'}
                        onChange={handleInputChange}
                        onFocus={(e) => e.target.blur()}
                        className="w-4 h-4 text-[#14B7E0] focus:ring-[#14B7E0] focus:ring-offset-0"
                    />
                    <span className="text-gray-700">Да</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value="no"
                        checked={formData[name as keyof typeof formData] === 'no'}
                        onChange={handleInputChange}
                        onFocus={(e) => e.target.blur()}
                        className="w-4 h-4 text-[#14B7E0] focus:ring-[#14B7E0] focus:ring-offset-0"
                    />
                    <span className="text-gray-700">Нет</span>
                </label>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F28F20]/20 shadow-sm">
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
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на доклинику</Link>
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
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинику</Link>
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
                        <span className="text-gray-900 font-medium">Заявка на НИР по фармацевтической разработке</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 sm:px-8 py-6 sm:py-8" style={{ background: 'linear-gradient(to right, #14B7E0, #0ea5cc)' }}>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Заявка на проведение НИР по фармацевтической разработке</h1>
                        <p className="text-white/80 text-sm">Сертификат на соответствие ГОСТ 33044-2014 № 19.0291.026 • Система менеджмента сертифицирована с 2016 г.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#14B7E0]">Информация о Спонсоре исследования</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название организации *</label>
                                    <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Адрес организации *</label>
                                    <input type="text" name="organizationAddress" value={formData.organizationAddress} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ФИО контактного лица *</label>
                                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Электронная почта *</label>
                                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                    <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата оформления заявки</label>
                                    <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#14B7E0]">1. Информация о планируемом к разработке препарате</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Какой препарат планируется к разработке *</label>
                                    <select name="drugType" value={formData.drugType} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition">
                                        <option value="">Выберите из списка...</option>
                                        <option value="original">Оригинальный препарат</option>
                                        <option value="generic">Воспроизведенный препарат</option>
                                        <option value="newDosageForm">Новая лекарственная форма</option>
                                        <option value="newDosage">Новая дозировка</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Планируемая лекарственная форма(ы) препарата</label>
                                        <input type="text" name="dosageForm" value={formData.dosageForm} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Планируемая дозировка(и) препарата</label>
                                        <input type="text" name="dosage" value={formData.dosage} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Планируемая первичная упаковка</label>
                                        <input type="text" name="primaryPackaging" value={formData.primaryPackaging} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                </div>

                                <div className="bg-[#14B7E0]/10 rounded-xl p-4 mt-6">
                                    <h3 className="text-lg font-semibold text-[#14B7E0] mb-4">Информация об активной фармацевтической субстанции</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Действующее вещество(а)</label>
                                            <input type="text" name="activeSubstance" value={formData.activeSubstance} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Фармакологическая группа</label>
                                            <input type="text" name="pharmacologicalGroup" value={formData.pharmacologicalGroup} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Химическая группа, химическая структура, формула(ы)</label>
                                            <textarea name="chemicalStructure" value={formData.chemicalStructure} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Методы количественного анализа</label>
                                            <input type="text" name="quantitativeAnalysisMethods" value={formData.quantitativeAnalysisMethods} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Физико-химические свойства</label>
                                            <input type="text" name="physicochemicalProperties" value={formData.physicochemicalProperties} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Условия хранения</label>
                                            <input type="text" name="storageConditions" value={formData.storageConditions} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Информация о стабильности</label>
                                            <input type="text" name="stabilityInfo" value={formData.stabilityInfo} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Стадия отработки технологии получения субстанции</label>
                                            <select name="technologyStage" value={formData.technologyStage} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition bg-white">
                                                <option value="">Выберите...</option>
                                                <option value="intermediate">Промежуточная</option>
                                                <option value="final">Окончательная</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#F28F20]/10 rounded-xl p-4 mt-6">
                                    <h3 className="text-lg font-semibold text-[#F28F20] mb-4">Информация о планируемом производстве препарата</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Производственная площадка</label>
                                            <input type="text" name="productionSite" value={formData.productionSite} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Оборудование, планируемое для производства препарата</label>
                                            <textarea name="productionEquipment" value={formData.productionEquipment} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition bg-white"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Оборудование для наработки опытных партий препарата на производстве с небольшими мощностями</label>
                                            <textarea name="pilotBatchEquipment" value={formData.pilotBatchEquipment} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition bg-white"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#14B7E0]">2. Информация о требуемом объеме работ по фармацевтической разработке</h2>

                            <div className="space-y-3">
                                <div className="bg-gray-100 rounded-xl p-4">
                                    <h3 className="text-md font-semibold text-gray-800 mb-3">Информационная проработка по теме фармацевтической разработки:</h3>
                                    <div className="space-y-2">
                                        <YesNoRadio name="literatureAnalysis" label="Анализ литературных данных (глубина литературной проработки 10 лет) по научным базам: PubMed, eLIBRARY, CyberLeninka, ClinicalTrials, Scopus" />
                                        <YesNoRadio name="patentSearch" label="Патентный поиск по базам: Espacenet, USPTO, EAPATIS, ФИПС, WIPO" />
                                    </div>
                                </div>

                                <YesNoRadio name="stressTestStability" label="Изучение стабильности активной фармацевтической субстанции в условиях стресс-тестов" />
                                <YesNoRadio name="biopharmaceuticalSolubility" label="Изучение биофармацевтической растворимости" />
                                <YesNoRadio name="compatibilityStudy" label="Изучение совместимости активной фармацевтической субстанции в составе комбинаций со вспомогательными веществами" />
                                <YesNoRadio name="methodValidation" label="Разработка и валидация методик стандартизации готовой лекарственной формы" />
                                <YesNoRadio name="formulationDevelopment" label="Разработка состава и лабораторной технологии получения лекарственной формы" />
                                <YesNoRadio name="documentationPreparation" label="Подготовка нормативной документации (проект нормативной документации + пояснительная записка)" />
                                <YesNoRadio name="labSamplesProduction" label="Наработка лабораторных образцов лекарственной формы для исследований стабильности" />
                                <YesNoRadio name="stabilitySamples" label="Изучение стабильности лабораторных образцов лекарственной формы в первичной упаковке" />
                                <YesNoRadio name="technologyTransfer" label="Трансфер технологии и аналитических методик" />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#14B7E0]">3. Для выполнения исследования будут предоставлены</h2>
                            <p className="text-sm text-gray-300 mb-4">Отметьте позиции, которые будут Вами предоставлены до начала исследования</p>

                            <div className="space-y-3">
                                <YesNoRadio name="apiProvided" label="Активная фармацевтическая субстанция в необходимом для проведения исследований количестве (расчет-обоснование будет предоставлен)" />
                                <YesNoRadio name="apiCertificate" label="Аналитический паспорт (сертификат анализа) на активную фармацевтическую субстанцию" />
                                <YesNoRadio name="apiDocumentation" label="Нормативная документация на активную фармацевтическую субстанцию" />

                                <div className="bg-gray-100 rounded-xl p-4">
                                    <h3 className="text-md font-semibold text-gray-800 mb-3">Стандартные образцы АФС соответствующей квалификации для разработки методов анализа:</h3>
                                    <div className="space-y-2">
                                        <YesNoRadio name="apiStandardGSO" label="ГСО (государственный стандартный образец)" />
                                        <YesNoRadio name="apiStandardForeign" label="Стандартный образец по зарубежным фармакопеям (USP RS, EP CRS)" />
                                        <YesNoRadio name="apiStandardOther" label="Образцы иной квалификации" />
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-4">
                                    <h3 className="text-md font-semibold text-gray-800 mb-3">Стандартные образцы примесей соответствующей квалификации для разработки методов анализа:</h3>
                                    <div className="space-y-2">
                                        <YesNoRadio name="impurityStandardGSO" label="ГСО (государственный стандартный образец)" />
                                        <YesNoRadio name="impurityStandardForeign" label="Стандартный образец по зарубежным фармакопеям (USP RS, EP CRS)" />
                                        <YesNoRadio name="impurityStandardOther" label="Образцы иной квалификации" />
                                    </div>
                                </div>

                                <YesNoRadio name="excipients" label="Вспомогательные вещества для разработки лекарственной формы" />
                                <YesNoRadio name="primaryPackagingProvided" label="Первичная упаковка" />
                                <YesNoRadio name="referenceProduct" label="Образцы референтного объекта в необходимом для проведения исследований количестве (расчет-обоснование будет предоставлен)" />
                            </div>
                        </section>

                        <div className="pt-6 border-t border-gray-100">
                            <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                Отправить заявку
                            </button>
                            <p className="mt-4 text-sm text-gray-500">* — обязательные поля</p>
                        </div>
                    </form>
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
                                <p className="flex items-start gap-3 leading-relaxed"><span className="text-[#F28F20] mt-0.5">📍</span><span>{t.footerAddress}</span></p>
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