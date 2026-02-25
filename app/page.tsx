'use client'

import { useState } from 'react'
import Link from 'next/link'
import ScrollToTop from '@/components/ScrollToTop'
import LanguageSwitcher from '@/translations/LanguageSwitcher'
import PartnersCarousel from '@/components/PartnersCarousel'
import { translations, Language } from '@/translations/translations'

export default function Home() {
    const [lang, setLang] = useState<Language>('ru')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [videoModalOpen, setVideoModalOpen] = useState(false)
    const t = translations[lang]

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#F28F20]/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex justify-between items-center h-14 sm:h-16">
                        <div className="flex items-center gap-2 sm:gap-4 h-full">
                            <img src="/logo/logo-vector.png" alt="АО НПО ДОМ ФАРМАЦИИ" className="h-10 sm:h-12 w-auto object-contain" />
                            <div className="hidden md:flex border-l-2 border-[#F28F20]/30 pl-4 h-12 items-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight">НПО Дом фармации</h1>
                            </div>
                        </div>
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
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                        <div className="px-4 py-4 space-y-3">
                            <Link href="/zayavka-doklinicheskie" className="block w-full px-4 py-3 bg-[#F28F20] hover:bg-[#e07d10] text-white text-center font-medium rounded-lg transition-all">Заявка на доклинику</Link>
                            <Link href="/zayavka-nir" className="block w-full px-4 py-3 bg-[#14B7E0] hover:bg-[#0ea5cc] text-white text-center font-medium rounded-lg transition-all">Заявка на НИР</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <Link href="/o-nas" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">О нас</Link>
                            <Link href="/kontakty" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Контакты</Link>
                            <Link href="/category/news" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Новости</Link>
                            <Link href="/vakansii" className="block px-4 py-2 text-gray-700 hover:bg-[#F28F20]/10 hover:text-[#F28F20] rounded-lg transition">Вакансии</Link>
                            <div className="border-t border-gray-100 my-3"></div>
                            <div className="px-4 py-2 space-y-2">
                                <a href={`tel:${t.phone}`} className="flex items-center gap-2 text-gray-700"><span className="text-[#F28F20]">📞</span><span className="font-medium">{t.phone}</span></a>
                                <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-gray-500 text-sm"><span className="text-[#14B7E0]">✉️</span><span>{t.email}</span></a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #F28F20 0%, #F28F20 40%, #5BC0C4 70%, #14B7E0 100%)' }}>
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="1"/><circle cx="75" cy="75" r="20" fill="none" stroke="white" strokeWidth="1"/><path d="M0 50 Q25 25 50 50 T100 50" fill="none" stroke="white" strokeWidth="1"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
                    </svg>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="text-white text-center md:text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">{t.heroTitle}</h1>
                            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">{t.heroDescription}</p>
                            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                                <Link href="/o-nas" className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#F28F20] rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base text-center">{t.aboutButton}</Link>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div
                                className="relative w-full h-80 bg-white/20 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/30 cursor-pointer"
                                onClick={() => setVideoModalOpen(true)}
                            >
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline><source src="/video/hero-video.mp4" type="video/mp4" /></video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-8 sm:h-12 md:h-20 fill-current text-white" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path></svg>
                </div>
            </section>

            <PartnersCarousel lang={lang} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-16">
                <section>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#146FA8] to-[#14B7E0] rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">О компании</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <Link href="/o-nas" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card3Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card3Desc}</p>
                            </div>
                        </Link>
                        <Link href="/spetsialisty" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card4Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card4Desc}</p>
                            </div>
                        </Link>
                        <Link href="/litsenzii-sertifikaty-udostovereniya" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#146FA8]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#146FA8] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#146FA8] transition-colors">{t.card13Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card13Desc}</p>
                            </div>
                        </Link>
                        <Link href="/policy" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#ABA8B1]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ABA8B1] to-[#8a878f] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ABA8B1] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{t.card10Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card10Desc}</p>
                            </div>
                        </Link>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#14B7E0] to-[#146FA8] rounded-full"></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Контакты и информация</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <Link href="/kontakty" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card16Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card16Desc}</p>
                            </div>
                        </Link>
                        <Link href="/glavnaya" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card12Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card12Desc}</p>
                            </div>
                        </Link>
                        <Link href="/category/news" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#146FA8]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#146FA8] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#146FA8] transition-colors">{t.card17Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card17Desc}</p>
                            </div>
                        </Link>
                        <Link href="/vakansii" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card19Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card19Desc}</p>
                            </div>
                        </Link>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="w-1 h-6 sm:h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #F28F20, #c46a0a)' }}></div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Наши услуги и лаборатории</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <Link href="/doklinicheskie-issledovaniya" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card1Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card1Desc}</p>
                            </div>
                        </Link>
                        <Link href="/gruppa-gistologii-i-patomorfologii" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card2Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card2Desc}</p>
                            </div>
                        </Link>
                        <Link href="/himiko-analiticheskie-issledovaniya" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#146FA8]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#146FA8] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#146FA8] transition-colors">{t.card5Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card5Desc}</p>
                            </div>
                        </Link>
                        <Link href="/tehnologiya-i-farmakokinetika" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card6Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card6Desc}</p>
                            </div>
                        </Link>
                        <Link href="/mikrobiologicheskaya-laboratoriya" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card7Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card7Desc}</p>
                            </div>
                        </Link>
                        <Link href="/laboratornye-zhivotnye" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#146FA8]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#146FA8] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#146FA8] transition-colors">{t.card8Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card8Desc}</p>
                            </div>
                        </Link>
                        <Link href="/obespechenie-kachestva" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card9Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card9Desc}</p>
                            </div>
                        </Link>
                        <Link href="/gruppa-biohimii-i-gematologii" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#0ea5cc] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card11Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card11Desc}</p>
                            </div>
                        </Link>
                        <Link href="/innovatsionnaya-deyatelnost" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#146FA8]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#146FA8] to-[#0d5a8a] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#146FA8] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#146FA8] transition-colors">{t.card14Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card14Desc}</p>
                            </div>
                        </Link>
                        <a href="http://labanimalsjournal.ru/contents/2018/2" target="_blank" rel="noopener noreferrer" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#F28F20]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F28F20] to-[#e07d10] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#F28F20] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F28F20] transition-colors">{t.card15Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card15Desc}</p>
                            </div>
                        </a>
                        <Link href="/provizorskaya-sluzhba" className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-[#14B7E0]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14B7E0] to-[#146FA8] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <div className="relative z-10 flex-1 flex flex-col">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#14B7E0] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-[#14B7E0] transition-colors">{t.card18Title}</h4>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{t.card18Desc}</p>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-12 sm:mt-20">
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

            {/* Модальное окно видео */}
            {videoModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setVideoModalOpen(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-[#F28F20] transition-colors p-2 bg-black/50 rounded-full"
                        onClick={() => setVideoModalOpen(false)}
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <video
                        className="max-w-full max-h-full rounded-xl shadow-2xl"
                        controls
                        autoPlay
                        onClick={(e) => e.stopPropagation()}
                    >
                        <source src="/video/hero-video.mp4" type="video/mp4" />
                    </video>
                </div>
            )}

            <ScrollToTop />
        </div>
    )
}