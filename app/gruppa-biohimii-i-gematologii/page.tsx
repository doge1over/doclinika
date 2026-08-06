import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-diagnostics.json'

const sourceBlocks = content as ResearchBlock[]
const services = sourceBlocks.find((block) => block.kind === 'list')
const publications = sourceBlocks.filter((block) => block.kind === 'publications')
const paragraphs = sourceBlocks.filter((block) => block.kind === 'paragraph')
const blocks: ResearchBlock[] = [
    ...publications,
    {
        kind: 'diagnostics-services',
        title: 'Что делает отдел лабораторной диагностики для Вас?',
        items: services?.kind === 'list' ? services.items : [],
    },
    ...paragraphs,
]

export const metadata: Metadata = {
    title: 'Отдел лабораторной диагностики | ДОМ ФАРМАЦИИ',
    description: 'Лабораторная диагностика в доклинических исследованиях: анализы крови и мочи, коагулометрия и микроскопические исследования.',
}

export default function LaboratoryDiagnosticsPage() {
    return (
        <ResearchDepartmentPage
            active="diagnostics"
            title="Отдел лабораторной диагностики"
            blocks={blocks}
        />
    )
}
