'use client'

import { useEffect, useState } from 'react'
import { THIRD_PARTY_STORAGE_KEY } from '@/components/CookieConsent'

export default function ConsentAwareMap() {
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        const update = () => setAllowed(localStorage.getItem(THIRD_PARTY_STORAGE_KEY) === 'accepted')
        update()
        window.addEventListener('doclinika-consent-change', update)
        return () => window.removeEventListener('doclinika-consent-change', update)
    }, [])

    const allow = () => {
        localStorage.setItem(THIRD_PARTY_STORAGE_KEY, 'accepted')
        window.dispatchEvent(new CustomEvent('doclinika-consent-change', { detail: 'accepted' }))
        setAllowed(true)
    }

    if (allowed) return <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Adc7b04b68a41ad1bdf18c8112ff573806757e0f708dfd54378d8ba4859993f58" width="100%" height="180" frameBorder="0" allowFullScreen className="rounded-xl sm:rounded-2xl shadow-lg" title="Карта" />

    return <div className="flex h-[180px] items-center justify-center rounded-xl border border-gray-700 bg-gray-800 p-5 text-center sm:rounded-2xl">
        <div><p className="text-sm text-gray-300">Карта загружается только с вашего разрешения.</p><button type="button" onClick={allow} className="mt-3 rounded-lg bg-[#F28F20] px-4 py-2 text-sm font-semibold text-white">Показать карту</button></div>
    </div>
}
