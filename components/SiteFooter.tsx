import Link from 'next/link'
import { translations, type Language } from '@/translations/translations'
import ConsentAwareMap from '@/components/ConsentAwareMap'

export default function SiteFooter({ lang }: { lang: Language }) {
    const t = translations[lang]

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
                    <div>
                        <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerInfo}</h3>
                        <ul className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                            <li><Link href="/o-nas" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />{t.footerAbout}</Link></li>
                            <li><Link href="/category/news" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />{t.footerNews}</Link></li>
                            <li><Link href="/kontakty" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />{t.footerContacts}</Link></li>
                            <li><Link href="/politika-obrabotki-personalnyh-dannyh" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />Политика обработки персональных данных</Link></li>
                            <li><Link href="/soglasie-na-obrabotku-personalnyh-dannyh" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />Согласие на обработку персональных данных</Link></li>
                            <li><Link href="/politika-cookie" className="hover:text-[#F28F20] transition flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#F28F20] rounded-full" />Политика cookies</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerOurContacts}</h3>
                        <div className="space-y-3 sm:space-y-4 text-sm text-gray-300">
                            <p className="flex items-center gap-3"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><a href={`tel:${t.phone}`} className="hover:text-[#F28F20] transition font-medium">{t.phone}</a></p>
                            <p className="flex items-center gap-3"><svg className="w-4 h-4 text-[#F28F20]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><a href={`mailto:${t.email}`} className="hover:text-[#F28F20] transition break-all">{t.email}</a></p>
                            <p className="flex items-start gap-3"><svg className="w-4 h-4 text-[#F28F20] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>188663, Россия, Ленинградская область,<br />Всеволожский район, г.п. Кузьмоловский,<br />Заводская улица, 3-245</span></p>
                        </div>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-sm font-bold text-[#F28F20] uppercase tracking-wider mb-4 sm:mb-6">{t.footerHowToGet}</h3>
                        <ConsentAwareMap />
                    </div>
                </div>
                <div className="pt-6 sm:pt-8 border-t border-gray-700 text-center text-xs sm:text-sm text-gray-400">
                    <p className="font-medium">АО «НПО «ДОМ ФАРМАЦИИ» © 2026</p>
                </div>
            </div>
        </footer>
    )
}
