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
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    const duplicatedPartners = [...partners, ...partners]

    const scrollLeft = () => {
        if (carouselRef.current) {
            const isMobile = window.innerWidth < 640
            if (isMobile) {
                const newIndex = Math.max(0, currentIndex - 1)
                setCurrentIndex(newIndex)
                const cardWidth = carouselRef.current.offsetWidth
                carouselRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' })
            } else {
                carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
            }
        }
    }

    const scrollRight = () => {
        if (carouselRef.current) {
            const isMobile = window.innerWidth < 640
            if (isMobile) {
                const maxIndex = duplicatedPartners.length - 1
                const newIndex = Math.min(maxIndex, currentIndex + 1)
                setCurrentIndex(newIndex)
                const cardWidth = carouselRef.current.offsetWidth
                carouselRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' })
            } else {
                carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
            }
        }
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.offsetWidth
            carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
        }
    }

    return (
        <section className="relative bg-white py-8 sm:py-10 pb-16 sm:pb-20 overflow-hidden">
            {/* Фон с новыми цветами */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#F28F20]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#14B7E0]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-[#146FA8]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#F28F20] to-[#14B7E0] rounded-full"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
                        {lang === 'ru' ? 'Наши партнеры' : 'Our Partners'}
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#14B7E0] to-[#146FA8] rounded-full"></div>
                </div>

                <div className="relative">
                    {/* Кнопка влево */}
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#F28F20] text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-105 border border-gray-200 hover:border-[#F28F20]"
                        aria-label="Scroll left"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Кнопка вправо */}
                    <button
                        onClick={scrollRight}
                        className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#F28F20] text-gray-800 hover:text-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-105 border border-gray-200 hover:border-[#F28F20]"
                        aria-label="Scroll right"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Карусель */}
                    <div className="overflow-hidden px-6 sm:px-8 pt-4 pb-4 sm:pb-6 relative">
                        <div
                            ref={carouselRef}
                            className="flex gap-0 sm:gap-5 overflow-x-hidden sm:overflow-x-scroll scroll-smooth hide-scrollbar sm:snap-x sm:snap-mandatory pb-6 sm:pb-8"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="flex-shrink-0 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)] bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(242,143,32,0.3)] transition-all duration-300 group sm:snap-start border border-gray-100 hover:border-[#F28F20]"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        {/* Логотип */}
                                        <div className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-3 bg-gradient-to-br from-[#F28F20]/5 to-[#14B7E0]/5 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md overflow-hidden border border-[#F28F20]/10">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
                                            />
                                        </div>

                                        {/* Название */}
                                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 min-h-[40px] sm:min-h-[48px] flex items-center justify-center line-clamp-2 group-hover:text-[#F28F20] transition-colors">
                                            {partner.name}
                                        </h3>

                                        {/* Фото */}
                                        <div
                                            className="w-full h-96 sm:h-80 bg-gradient-to-br from-[#F28F20]/5 to-[#14B7E0]/5 rounded-lg overflow-hidden cursor-pointer shadow-md border-2 border-gray-100 hover:border-[#14B7E0] transition-colors"
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

                    {/* Индикаторы для мобильных */}
                    <div className="flex justify-center gap-2 mt-4 sm:hidden">
                        {partners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    currentIndex === index || currentIndex === index + partners.length
                                        ? 'bg-[#F28F20] w-6'
                                        : index % 3 === 0
                                            ? 'bg-[#F28F20]/30 hover:bg-[#F28F20]/50'
                                            : index % 3 === 1
                                                ? 'bg-[#14B7E0]/30 hover:bg-[#14B7E0]/50'
                                                : 'bg-[#146FA8]/30 hover:bg-[#146FA8]/50'
                                }`}
                                aria-label={`Перейти к слайду ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-[#F28F20] transition-colors p-2 bg-black/50 rounded-full"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </section>
    )
}