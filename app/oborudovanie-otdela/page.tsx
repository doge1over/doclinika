import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-equipment.json'

export const metadata: Metadata = {
    title: 'Оборудование | ДОМ ФАРМАЦИИ',
    description: 'Аналитическое и технологическое оборудование отдела.',
}

export default function EquipmentPage() {
    return (
        <ResearchDepartmentPage
            active="equipment"
            title="Оборудование"
            blocks={content as ResearchBlock[]}
        />
    )
}
