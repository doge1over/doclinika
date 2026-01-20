'use client'

import { useState, useCallback } from 'react'
import { translations, Language } from './translations'

export function useTranslation(initialLang: Language = 'ru') {
    const [lang, setLang] = useState<Language>(initialLang)

    const t = translations[lang]

    const changeLanguage = useCallback((newLang: Language) => {
        setLang(newLang)
    }, [])

    return {
        t,
        lang,
        changeLanguage
    }
}