'use client'

import { useState } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import { translations, Language } from '@/translations/translations'
import Link from 'next/link'

export default function ZayavkaDKI() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const t = translations[lang]

    const [formData, setFormData] = useState({
        organizationName: '',
        organizationAddress: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        applicationDate: '',
        researchGoal: '',
        researchType: '',

        developProgram: false,
        prepareLiteratureReview: false,

        singleDoseToxicity: false,
        doseRangingStudy: false,
        repeatDoseToxicity: false,
        chronicToxicity: false,
        reproductiveToxicity: false,
        immunotoxicity: false,
        allergenicProperties: false,
        mutagenicity: false,
        carcinogenicity: false,
        localTolerance: false,
        phototoxicity: false,
        addictivePotential: false,
        additionalToxStudies: false,

        pharmacokinetics: false,
        pharmacodynamics: false,
        toxicokinetics: false,
        bioequivalence: false,
        biopharmaceuticalStudies: false,
        pharmacodynamicsStudy: false,

        experimentalModelWishes: '',
        individualWishes: '',
        previousStudiesExist: '',

        drugInnovativeness: '',
        innName: '',
        tradeName: '',
        activeSubstance: '',
        chemicalStructure: '',
        dosageForm: '',
        composition: '',
        pharmacologicalGroup: '',
        indications: '',
        storageConditions: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
    }

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
                                <Link href="/zayavka-doklinicheskie" className="px-4 py-2 bg-[#F28F20] hover:bg-[#e07d10] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на ДКИ</Link>
                                <Link href="/zayavka-nir" className="px-4 py-2 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-sm font-medium rounded-lg transition-all whitespace-nowrap">Заявка на Фарм. разработку</Link>
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
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на ДКИ</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-center font-medium rounded-lg transition-all">Заявка на Фарм. разработку</Link>
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
                        <span className="text-gray-900 font-medium">Заявка на проведение доклинических исследований</span>
                    </nav>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#F28F20] via-[#F28F20]/90 to-[#14B7E0] px-6 sm:px-8 py-6 sm:py-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Заявка на проведение доклинических исследований</h1>
                        <p className="text-white/90 text-sm">Сертификат на соответствие ГОСТ 33044-2014 № 19.0291.026 • Система менеджмента сертифицирована с 2016 г.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-8 space-y-8">

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#F28F20]">Информация о Спонсоре исследования</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название организации *</label>
                                    <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Адрес организации *</label>
                                    <input type="text" name="organizationAddress" value={formData.organizationAddress} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ФИО контактного лица *</label>
                                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Электронная почта *</label>
                                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                    <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата оформления заявки</label>
                                    <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#F28F20]">Цель исследования</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Опишите цель исследования</label>
                                    <textarea name="researchGoal" value={formData.researchGoal} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition" placeholder="Заполните в произвольной форме или выберите тип ниже"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Планируемое исследование</label>
                                    <div className="flex flex-wrap gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="researchType" value="regulatory" checked={formData.researchType === 'regulatory'} onChange={handleInputChange} className="w-4 h-4 text-[#F28F20] focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Регуляторное</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="researchType" value="exploratory" checked={formData.researchType === 'exploratory'} onChange={handleInputChange} className="w-4 h-4 text-[#F28F20] focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Поисковое</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#F28F20]">Информация о дизайне исследования</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                        <input type="checkbox" name="developProgram" checked={formData.developProgram} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                        <span className="text-gray-700">Разработка программы доклинических исследований</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                        <input type="checkbox" name="prepareLiteratureReview" checked={formData.prepareLiteratureReview} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                        <span className="text-gray-700">Подготовка литературного обзора</span>
                                    </label>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Изучение безопасности лекарственных средств и химических веществ:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="singleDoseToxicity" checked={formData.singleDoseToxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Токсичность при однократном введении</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="doseRangingStudy" checked={formData.doseRangingStudy} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Поиск токсических доз (dose-ranging study)</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="repeatDoseToxicity" checked={formData.repeatDoseToxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Токсичность при многократном введении</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="chronicToxicity" checked={formData.chronicToxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Хроническая токсичность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="reproductiveToxicity" checked={formData.reproductiveToxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Репродуктивная токсичность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="immunotoxicity" checked={formData.immunotoxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Иммунотоксичность при однократном и курсовом введении</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="allergenicProperties" checked={formData.allergenicProperties} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Аллергизующие свойства</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="mutagenicity" checked={formData.mutagenicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Мутагенность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="carcinogenicity" checked={formData.carcinogenicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Канцерогенность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="localTolerance" checked={formData.localTolerance} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Местная переносимость</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="phototoxicity" checked={formData.phototoxicity} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Фототоксичность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="addictivePotential" checked={formData.addictivePotential} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Аддиктивный потенциал</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#F28F20]/10 transition cursor-pointer">
                                            <input type="checkbox" name="additionalToxStudies" checked={formData.additionalToxStudies} onChange={handleInputChange} className="w-5 h-5 text-[#F28F20] rounded focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Дополнительные токсикологические исследования</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Фармакокинетические и фармакодинамические исследования:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="pharmacokinetics" checked={formData.pharmacokinetics} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Фармакокинетика</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="pharmacodynamics" checked={formData.pharmacodynamics} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Фармакодинамика</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="toxicokinetics" checked={formData.toxicokinetics} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Токсикокинетика</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="bioequivalence" checked={formData.bioequivalence} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Биоэквивалентность</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="biopharmaceuticalStudies" checked={formData.biopharmaceuticalStudies} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Биофармацевтические исследования в соответствии с ГФ</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#14B7E0]/10 transition cursor-pointer">
                                            <input type="checkbox" name="pharmacodynamicsStudy" checked={formData.pharmacodynamicsStudy} onChange={handleInputChange} className="w-5 h-5 text-[#14B7E0] rounded focus:ring-[#14B7E0]" />
                                            <span className="text-gray-700">Изучение фармакодинамики</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Пожелания по экспериментальной модели, дизайну исследования</label>
                                    <textarea name="experimentalModelWishes" value={formData.experimentalModelWishes} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Индивидуальные пожелания (характеристика и количество тест-систем, методы оценки, сроки исследования, др.)</label>
                                    <textarea name="individualWishes" value={formData.individualWishes} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F28F20] focus:border-[#F28F20] transition"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Имеется ли у Вас информация о том, что аналогичные исследования уже проводились?</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="previousStudiesExist" value="yes" checked={formData.previousStudiesExist === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-[#F28F20] focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Да</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="previousStudiesExist" value="no" checked={formData.previousStudiesExist === 'no'} onChange={handleInputChange} className="w-4 h-4 text-[#F28F20] focus:ring-[#F28F20]" />
                                            <span className="text-gray-700">Нет</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#14B7E0]">Информация об исследуемом препарате</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Степень инновативности исследуемого препарата *</label>
                                    <select name="drugInnovativeness" value={formData.drugInnovativeness} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition">
                                        <option value="">Выберите из списка...</option>
                                        <option value="reference">Референтный лекарственный препарат</option>
                                        <option value="original">Оригинальный лекарственный препарат</option>
                                        <option value="generic">Воспроизведенный препарат</option>
                                        <option value="hybrid">Гибридный препарат</option>
                                        <option value="combined">Комбинированный препарат</option>
                                        <option value="biosimilar">Биоаналог</option>
                                    </select>

                                    {formData.drugInnovativeness && (
                                        <div className="mt-2 p-3 bg-[#14B7E0]/10 rounded-lg text-sm text-[#14B7E0]">
                                            {formData.drugInnovativeness === 'generic' && 'Имеет такой же качественный и количественный состав действующих веществ (ФС), в такой же лекарственной форме, что и референтный лекарственный препарат, биоэквивалентность которого референтному лекарственному препарату подтверждена соответствующими исследованиями'}
                                            {formData.drugInnovativeness === 'hybrid' && 'Такой воспроизведенный лекарственный препарат, который может отличаться от соответствующего референтного лекарственного препарата по одному или нескольким параметрам'}
                                            {formData.drugInnovativeness === 'combined' && 'Готовый лекарственный препарат, содержащий два и более активных фармацевтических ингредиента'}
                                            {formData.drugInnovativeness === 'biosimilar' && 'Биологический лекарственный препарат, схожий по параметрам качества, эффективности и безопасности с референтным биологическим лекарственным препаратом в такой же лекарственной форме и имеющий идентичный способ введения'}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Международное непатентованное наименование (МНН)</label>
                                        <input type="text" name="innName" value={formData.innName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Торговое наименование</label>
                                        <input type="text" name="tradeName" value={formData.tradeName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Действующее вещество(а)</label>
                                        <input type="text" name="activeSubstance" value={formData.activeSubstance} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Лекарственная форма(ы)</label>
                                        <input type="text" name="dosageForm" value={formData.dosageForm} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Химическая группа, химическая структура, формула(ы)</label>
                                    <textarea name="chemicalStructure" value={formData.chemicalStructure} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition"></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Состав готовой лекарственной формы</label>
                                    <textarea name="composition" value={formData.composition} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition"></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Фармакологическая группа</label>
                                        <input type="text" name="pharmacologicalGroup" value={formData.pharmacologicalGroup} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Условия хранения</label>
                                        <input type="text" name="storageConditions" value={formData.storageConditions} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Показания к применению</label>
                                    <textarea name="indications" value={formData.indications} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14B7E0] focus:border-[#14B7E0] transition"></textarea>
                                </div>
                            </div>
                        </section>

                        <div className="pt-6 border-t border-gray-100">
                            <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[#F28F20] hover:bg-[#e07d10] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
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
                                <p className="flex items-center gap-3"><span className="text-[#14B7E0]">✉️</span><a href={`mailto:${t.email}`} className="hover:text-[#14B7E0] transition break-all">{t.email}</a></p>
                                <p className="flex items-start gap-3 leading-relaxed"><span className="text-[#146FA8] mt-0.5">📍</span><span>{t.footerAddress}</span></p>
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