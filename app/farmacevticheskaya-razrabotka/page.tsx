import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-development.json'

export const metadata: Metadata = {
    title: 'Разработка лекарственных форм | ДОМ ФАРМАЦИИ',
    description: 'Лабораторный этап фармацевтической разработки различных лекарственных форм.',
}

export default function PharmaceuticalDevelopmentPage() {
    const blocks = content as ResearchBlock[]
    const orderedBlocks = [
        ...blocks.filter((block) => block.kind === 'publications'),
        ...blocks.filter((block) => block.kind !== 'publications'),
    ]

    return (
        <ResearchDepartmentPage
            active="development"
            title="Разработка лекарственных форм"
            blocks={orderedBlocks}
        />
    )
}
