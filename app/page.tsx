import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img
                                src="https://doclinika.ru/wp-content/themes/doclinika/images/logo-01.png"
                                alt="АО НПО ДОМ ФАРМАЦИИ"
                                className="h-12"
                            />
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-6">
                            {/* Language - новый стиль */}
                            <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-full p-1">
                                <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white transition-all">
                                    EN
                                </button>
                                <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-900 shadow-sm">
                                    RU
                                </button>
                            </div>

                            {/* Contact */}
                            <div className="text-right">
                                <a href="tel:+78126037428" className="block text-sm font-semibold text-gray-900 hover:text-blue-600 transition">
                                    +7(812) 603-74-28
                                </a>
                                <a href="mailto:info@doclinika.ru" className="block text-xs text-gray-500 hover:text-blue-600 transition">
                                    info@doclinika.ru
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Banner с кнопкой новости */}
            <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
                {/* Паттерн фона */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="1"/>
                                <circle cx="75" cy="75" r="20" fill="none" stroke="white" strokeWidth="1"/>
                                <path d="M0 50 Q25 25 50 50 T100 50" fill="none" stroke="white" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
                    </svg>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Левая часть - текст */}
                        <div className="text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Доклинические исследования и разработка препаратов
                            </h1>
                            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                                Современная лабораторная база для полного цикла исследований. Более 20 лет опыта в фармацевтической отрасли.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="/category/news" className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
                                    📰 Новости и события
                                </a>
                                <a href="/o-nas" className="px-8 py-4 bg-blue-500/30 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-blue-500/40 transition-all border-2 border-white/30">
                                    Узнать больше
                                </a>
                            </div>
                        </div>

                        {/* Правая часть - изображение/иллюстрация */}
                        <div className="hidden md:flex items-center justify-center">
                            <div className="relative w-full h-80 bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center">
                                <svg className="w-64 h-64 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Волна снизу */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 md:h-20 fill-current text-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
                    </svg>
                </div>
            </section>

            {/* Main Grid - все карточки одинакового размера */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* 1. Доклинические исследования */}
                    <a href="/doklinicheskie-issledovaniya" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern1" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <circle cx="20" cy="20" r="2" fill="#2563eb"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern1)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Доклинические исследования</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Минимизация рисков при испытании на людях</p>
                        </div>
                    </a>

                    {/* 2. Лаборатория гистологии */}
                    <a href="/gruppa-gistologii-i-patomorfologii" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern2" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                        <path d="M0 30 L30 0 L60 30 L30 60 Z" fill="none" stroke="#9333ea" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern2)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Гистология и патоморфология</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Информативные методы диагностики патологий</p>
                        </div>
                    </a>

                    {/* 3. О нас */}
                    <a href="/o-nas" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern3" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="15" height="15" fill="#06b6d4"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern3)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-cyan-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">О нас</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Информация о компании и достижениях</p>
                        </div>
                    </a>

                    {/* 4. Специалисты */}
                    <a href="/spetsialisty" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern3b" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="15" height="15" fill="#06b6d4"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern3b)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-cyan-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Специалисты</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Наша команда профессионалов</p>
                        </div>
                    </a>

                    {/* 5. Химико-аналитическая */}
                    <a href="/himiko-analiticheskie-issledovaniya" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern4" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                                        <line x1="0" y1="25" x2="50" y2="25" stroke="#16a34a" strokeWidth="1"/>
                                        <line x1="25" y1="0" x2="25" y2="50" stroke="#16a34a" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern4)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Химико-аналитическая лаборатория</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Методы исследования на всех этапах</p>
                        </div>
                    </a>

                    {/* 6. Разработка лекарственных форм */}
                    <a href="/tehnologiya-i-farmakokinetika" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern5" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <polygon points="20,5 35,35 5,35" fill="none" stroke="#ea580c" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern5)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Разработка лекарственных форм</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Целевая доставка субстанции</p>
                        </div>
                    </a>

                    {/* 7. Лаборатория микробиологии */}
                    <a href="/mikrobiologicheskaya-laboratoriya" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern6" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <circle cx="15" cy="15" r="8" fill="none" stroke="#db2777" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern6)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-pink-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Лаборатория микробиологии</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Оценка эффективности препаратов</p>
                        </div>
                    </a>

                    {/* 8. Лабораторные животные */}
                    <a href="/laboratornye-zhivotnye" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern7" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
                                        <path d="M17.5 5 L5 17.5 L17.5 30 L30 17.5 Z" fill="none" stroke="#ca8a04" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern7)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-yellow-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Лабораторные животные</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Здоровье и благополучие животных</p>
                        </div>
                    </a>

                    {/* Продолжение следует... */}

                    {/* 9. Обеспечение качества */}
                    <a href="/obespechenie-kachestva" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern8" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                                        <rect x="5" y="5" width="15" height="15" fill="none" stroke="#6366f1" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern8)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Обеспечение качества</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Контроль качества исследований</p>
                        </div>
                    </a>

                    {/* 10. Политики */}
                    <a href="/policy" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern8b" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                                        <rect x="5" y="5" width="15" height="15" fill="none" stroke="#6366f1" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern8b)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Политики</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Нормативная документация</p>
                        </div>
                    </a>

                    {/* 11. Биохимия и гематология */}
                    <a href="/gruppa-biohimii-i-gematologii" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern9" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M10 0 L10 20 M0 10 L20 10" stroke="#dc2626" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern9)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Биохимия и гематология</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Выявление патологий органов</p>
                        </div>
                    </a> {/* 12. Сведения об организации */}
                    <a href="/glavnaya" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern10" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <circle cx="10" cy="10" r="3" fill="#14b8a6"/>
                                        <circle cx="30" cy="30" r="3" fill="#14b8a6"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern10)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Сведения об организации</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Образовательная деятельность</p>
                        </div>
                    </a>

                    {/* 13. Лицензии */}
                    <a href="/litsenzii-sertifikaty-udostovereniya" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern10b" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <circle cx="10" cy="10" r="3" fill="#14b8a6"/>
                                        <circle cx="30" cy="30" r="3" fill="#14b8a6"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern10b)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Лицензии и сертификаты</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Документы и удостоверения</p>
                        </div>
                    </a>

                    {/* 14. Фармакокинетика */}
                    <a href="/innovatsionnaya-deyatelnost" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern11" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                                        <rect x="10" y="10" width="10" height="30" fill="#8b5cf6"/>
                                        <rect x="25" y="20" width="10" height="20" fill="#8b5cf6"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern11)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-violet-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Фармакокинетика</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Поиск активных ингредиентов</p>
                        </div>
                    </a>

                    {/* 15. Животные для исследований */}
                    <a href="http://labanimalsjournal.ru/contents/2018/2" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern12" x="0" y="0" width="45" height="45" patternUnits="userSpaceOnUse">
                                        <path d="M0 0 L45 45 M45 0 L0 45" stroke="#10b981" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern12)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Животные для исследований</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Научный журнал</p>
                        </div>
                    </a>

                    {/* 16. Контакты */}
                    <a href="/kontakty" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern13" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <circle cx="15" cy="15" r="5" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern13)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-sky-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Контакты</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Свяжитесь с нами</p>
                        </div>
                    </a>

                    {/* 17. Новости */}
                    <a href="/category/news" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern13b" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <circle cx="15" cy="15" r="5" fill="none" stroke="#0ea5e9" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern13b)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-sky-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Новости</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Актуальные события</p>
                        </div>
                    </a>

                    {/* 18. Провизорская служба */}
                    <a href="/provizorskaya-sluzhba" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern14" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                                        <path d="M25 0 L50 25 L25 50 L0 25 Z" fill="none" stroke="#f59e0b" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern14)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Провизорская служба</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Учет и сохранность препаратов</p>
                        </div>
                    </a>

                    {/* 19. Вакансии */}
                    <a href="/vakansii" className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                        <div className="absolute inset-0 opacity-5">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pattern15" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
                                        <rect x="10" y="10" width="15" height="15" fill="none" stroke="#f43f5e" strokeWidth="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pattern15)"/>
                            </svg>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <svg className="w-12 h-12 text-rose-600 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Вакансии</h4>
                            <p className="text-sm text-gray-600 leading-relaxed flex-1">Присоединяйтесь к команде</p>
                        </div>
                    </a>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-20 shadow-inner">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                        {/* Information */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Информация</h3>
                            <ul className="space-y-4 text-sm text-gray-600">
                                <li><a href="/o-nas" className="hover:text-gray-900 transition flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    О нас
                                </a></li>
                                <li><a href="/category/news" className="hover:text-gray-900 transition flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    Новости
                                </a></li>
                                <li><a href="/kontakty" className="hover:text-gray-900 transition flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                    Контакты
                                </a></li>
                            </ul>
                        </div>

                        {/* Contacts */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Наши контакты</h3>
                            <div className="space-y-4 text-sm text-gray-600">
                                <p className="flex items-center gap-3">
                                    <span className="text-blue-600">📞</span>
                                    <a href="tel:+78126037428" className="hover:text-gray-900 transition font-medium">
                                        +7(812) 603-74-28
                                    </a>
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-blue-600">✉️</span>
                                    <a href="mailto:info@doclinika.ru" className="hover:text-gray-900 transition">
                                        info@doclinika.ru
                                    </a>
                                </p>
                                <p className="flex items-start gap-3 leading-relaxed">
                                    <span className="text-blue-600 mt-0.5">📍</span>
                                    <span>188663, Россия, Ленинградская область, Всеволожский район, г.п. Кузьмоловский, Заводская улица, 3-245</span>
                                </p>
                            </div>
                        </div>

                        {/* Map */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Как добраться</h3>
                            <iframe
                                src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Adc7b04b68a41ad1bdf18c8112ff573806757e0f708dfd54378d8ba4859993f58"
                                width="100%"
                                height="220"
                                frameBorder="0"
                                allowFullScreen={true}
                                className="rounded-2xl shadow-lg"
                                title="Карта"
                            />
                        </div>

                    </div>

                    {/* Bottom */}
                    <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p className="font-medium">ДОМ ФАРМАЦИИ © 2022</p>
                    </div>
                </div>
            </footer>

            <ScrollToTop />
        </div>
    )
}