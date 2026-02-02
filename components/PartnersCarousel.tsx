'use client'

import { useState, useRef } from 'react'

interface Partner {
    id: number
    name: string
    logo: string
    photo: string
}

const partners: Partner[] = [
    { id: 1, name: 'OZON Фармацевтика', logo: '/partners/logos/logo_ozon.png', photo: '/partners/photos/pismo_ozon.jpg' },
    { id: 2, name: 'Самсон мед', logo: '/partners/logos/logo_samson_med.png', photo: '/partners/photos/pismo_samson_med.jpg' },
    { id: 3, name: 'Вертекс', logo: '/partners/logos/logo_verteks.png', photo: '/partners/photos/pismo_verteks.jpg' },
    { id: 4, name: 'СПбНИИВС', logo: '/partners/logos/logo_spbniivs.pdf', photo: '/partners/photos/SPbNIVS.jpg' },
    { id: 5, name: 'Атолл', logo: '/partners/logos/Snimok.pdf.jpg', photo: '/partners/photos/Rekomendatelnoe-pismo-Atoll_SPIF-scaled.jpg' },
    { id: 6, name: 'ГЕРОФАРМ', logo: '/partners/logos/Gerofarm-l.jpg', photo: '/partners/photos/Pismo.jpg' },
    { id: 7, name: 'НоваМедика', logo: '/partners/logos/NM_logo_rus_port.jpg', photo: '/partners/photos/Dom-Farmacii_Blagodarnost_02.02.2021-scaled.jpg' },
    { id: 8, name: "Dr.Reddy's", logo: '/partners/logos/Logotip.jpg', photo: '/partners/photos/Blagodarstvennoe-pismo-Reddis.-14042021-scaled.jpg' },
    { id: 9, name: 'ПОЛИСАН', logo: '/partners/logos/Logotip (1).jpg', photo: '/partners/photos/Blagodarstvennoe-pismo_POLISAN-scaled.jpg' },
    { id: 10, name: 'Эвалар', logo: '/partners/logos/Evalar.jpg', photo: '/partners/photos/Blagodarstvennoe-pismo_Dom-Farmacii-scaled.jpg' },
    { id: 11, name: 'ФармПак', logo: '/partners/logos/logotip (2).jpg', photo: '/partners/photos/Pismo_FarmPak-scaled.jpg' },
    { id: 12, name: 'НИИ гриппа им. А.А. Смородинцева', logo: '/partners/logos/NII-grippa_logo.png', photo: '/partners/photos/NII-grippa-im.-Smorodenceva-scaled.jpg' },
    { id: 13, name: 'Гелеспон', logo: '/partners/logos/GELESPON.jpg', photo: '/partners/photos/Pismo-GELESPON-scaled.jpg' },
]

interface PartnersCarouselProps {
    lang: 'ru' | 'en'
}

export default function PartnersCarousel({ lang }: PartnersCarouselProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Дублируем массив партнеров для плавной прокрутки
    const duplicatedPartners = [...partners, ...partners]

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    return (
        <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-10 pb-20 overflow-hidden">
            {/* Новый фон - геометрические фигуры */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    {lang === 'ru' ? 'Наши партнеры' : 'Our Partners'}
                </h2>

                <div className="relative">
                    {/* Кнопка влево */}
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Кнопка вправо */}
                    <button
                        onClick={scrollRight}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Карусель - ПОКАЗЫВАЕТ РОВНО 4 БЛОКА */}
                    <div className="overflow-visible px-8 pt-4 pb-6 relative">
                        <div
                            ref={carouselRef}
                            className="flex gap-5 overflow-x-scroll scroll-smooth hide-scrollbar snap-x snap-mandatory pb-8"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="flex-shrink-0 w-[calc((100%-60px)/4)] bg-white rounded-2xl p-5 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300 group snap-start"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        {/* Логотип - БЕЗ клика - УМЕНЬШЕН */}
                                        <div className="w-24 h-24 mb-3 bg-gray-50 rounded-xl flex items-center justify-center shadow-md overflow-hidden">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>

                                        {/* Название - УМЕНЬШЕН */}
                                        <h3 className="text-base font-bold text-gray-900 mb-3 min-h-[48px] flex items-center justify-center">
                                            {partner.name}
                                        </h3>

                                        {/* Фото - УМЕНЬШЕН для 4 блоков */}
                                        <div
                                            className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden cursor-pointer shadow-md border-2 border-gray-200 hover:border-blue-400 transition-colors"
                                            onClick={() => setSelectedImage(partner.photo)}
                                        >
                                            <img
                                                src={partner.photo}
                                                alt={partner.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно для просмотра изображения */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Скрытие скроллбара + Анимация blob */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    )
}