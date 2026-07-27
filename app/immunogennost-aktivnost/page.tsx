import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-immunogenicity.json'

export const metadata: Metadata = {
    title: 'Иммуногенность и специфическая активность | ДОМ ФАРМАЦИИ',
    description: 'Оценка иммуногенности и специфической активности in vitro и in vivo.',
}

export default function ImmunogenicityActivityPage() {
    return (
        <ResearchDepartmentPage
            active="immunogenicity"
            title="Иммуногенность. Оценка специфической активности in vitro и in vivo"
            blocks={content as ResearchBlock[]}
        />
    )
}
