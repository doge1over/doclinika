import Link from 'next/link'
import SiteFooter from '@/components/SiteFooter'

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-[#F28F20]/20 bg-white shadow-sm">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo/logo-vector.png" alt="АО НПО «ДОМ ФАРМАЦИИ»" className="h-11 w-auto" />
                        <span className="hidden font-bold text-gray-900 sm:block">НПО «ДОМ ФАРМАЦИИ»</span>
                    </Link>
                    <Link href="/" className="text-sm font-medium text-[#F28F20] hover:underline">На главную</Link>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
                <article className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-lg sm:px-10">
                    <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
                    <p className="mb-8 text-sm text-gray-500">Редакция от 7 сентября 2026 года</p>
                    <div className="space-y-5 leading-relaxed text-gray-700 [&_a]:text-[#146FA8] [&_a]:underline [&_h2]:pt-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
                        {children}
                    </div>
                </article>
            </main>
            <SiteFooter lang="ru" />
        </div>
    )
}
