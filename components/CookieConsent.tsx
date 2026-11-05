'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export const THIRD_PARTY_STORAGE_KEY = 'doclinika-third-party-services'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => setVisible(localStorage.getItem(THIRD_PARTY_STORAGE_KEY) === null), [])

    const choose = (value: 'accepted' | 'declined') => {
        localStorage.setItem(THIRD_PARTY_STORAGE_KEY, value)
        window.dispatchEvent(new CustomEvent('doclinika-consent-change', { detail: value }))
        setVisible(false)
    }

    if (!visible) return null

    return <aside className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl" aria-label="Настройки сторонних технологий">
        <p className="font-semibold text-gray-900">Сторонние функциональные технологии</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">Сайт не использует рекламные или аналитические cookies. С вашего разрешения мы загружаем Яндекс.Карты, которые могут использовать собственные технологии хранения данных. <Link href="/politika-cookie" className="text-[#146FA8] underline">Подробнее</Link></p>
        <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose('accepted')} className="rounded-lg bg-[#F28F20] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e07d10]">Разрешить карту</button>
            <button type="button" onClick={() => choose('declined')} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Отказаться</button>
        </div>
    </aside>
}
