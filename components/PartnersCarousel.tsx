'use client'

import { useState, useRef, useEffect } from 'react'

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
        <section className="bg-white py-16 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    {lang === 'ru' ? 'Наши партнеры' : 'Our Partners'}
                </h2>

                <div className="relative">
                    {/* Кнопка влево - ВНЕ карусели */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Кнопка вправо - ВНЕ карусели */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Карусель - СУЖЕНА для кнопок */}
                    <div className="mx-16 pb-8">
                        <div
                            ref={carouselRef}
                            className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar py-4"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="flex-shrink-0 w-72 bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        {/* Логотип */}
                                        <div
                                            className="w-32 h-32 mb-4 bg-white rounded-xl flex items-center justify-center shadow-md cursor-pointer overflow-hidden"
                                            onClick={() => setSelectedImage(partner.logo)}
                                        >
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-24 h-24 object-contain hover:scale-110 transition-transform"
                                            />
                                        </div>

                                        {/* Название */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 min-h-[56px] flex items-center">
                                            {partner.name}
                                        </h3>

                                        {/* Фото - УВЕЛИЧЕНО */}
                                        <div
                                            className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-md"
                                            onClick={() => setSelectedImage(partner.photo)}
                                        >
                                            <img
                                                src={partner.photo}
                                                alt={partner.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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

            {/* Скрытие скроллбара */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    )
}