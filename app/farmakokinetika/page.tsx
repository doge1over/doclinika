import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-pharmacokinetics.json'

export const metadata: Metadata = {
    title: 'Фармакокинетика, токсикокинетика, биоэквивалентность | ДОМ ФАРМАЦИИ',
    description: 'Доклинические исследования фармакокинетики, токсикокинетики и исследования биоэквивалентности.',
}

export default function PharmacokineticsPage() {
    return (
        <ResearchDepartmentPage
            active="pharmacokinetics"
            title="Фармакокинетика, токсикокинетика, биоэквивалентность"
            blocks={content as ResearchBlock[]}
        />
    )
}
