import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-immunogenicity.json'

export const metadata: Metadata = {
    title: 'Иммуноактивность | ДОМ ФАРМАЦИИ',
    description: 'Оценка иммуноактивности in vitro и in vivo.',
}

export default function ImmunogenicityActivityPage() {
    const blocks = content as ResearchBlock[]
    const orderedBlocks = [
        ...blocks.filter((block) => block.kind === 'publications'),
        ...blocks.filter((block) => block.kind === 'heading' || block.kind === 'list'),
        ...blocks.filter((block) => block.kind === 'equipment-link'),
        ...blocks.filter((block) => block.kind === 'paragraph' || block.kind === 'image'),
    ]

    return (
        <ResearchDepartmentPage
            active="immunogenicity"
            title="Иммуноактивность. Оценка специфической активности in vitro и in vivo"
            blocks={orderedBlocks}
        />
    )
}
