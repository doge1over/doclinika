'use client'

import { useState } from 'react'
import { Language } from '@/translations/translations'

interface LanguageSwitcherProps {
    currentLang: Language
    onLanguageChange: (lang: Language) => void
}

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
    return (
        <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-full p-1">
            <button
                onClick={() => onLanguageChange('en')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentLang === 'en'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                }`}
                title="Switch to English"
            >
                EN
            </button>
            <button
                onClick={() => onLanguageChange('ru')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentLang === 'ru'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-white'
                }`}
                title="Переключить на русский"
            >
                RU
            </button>
        </div>
    )
}