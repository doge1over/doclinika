import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-pharmacokinetics.json'

export const metadata: Metadata = {
    title: 'Фармакокинетика, токсикокинетика, биоэквивалентность | ДОМ ФАРМАЦИИ',
    description: 'Доклинические исследования фармакокинетики, токсикокинетики и исследования биоэквивалентности.',
}

export default function PharmacokineticsPage() {
    const blocks = content as ResearchBlock[]
    const publicationItems = blocks.flatMap((block) =>
        block.kind === 'publications' ? block.items : [],
    )
    const orderedBlocks: ResearchBlock[] = [
        ...(publicationItems.length > 0
            ? [{ kind: 'publications' as const, title: 'Публикации по теме', items: publicationItems }]
            : []),
        { kind: 'heading', text: 'Ключевая информация и нормативные документы' },
        ...blocks.slice(0, 3),
        {
            kind: 'pharmacokinetics-services',
            items: [
                {
                    title: 'Исследование фармакокинетики in vivo',
                    details: [
                        'Субстанций',
                        'Экспериментальной ГЛФ в ходе фармразработки',
                        'Оригинальных лекарственных средств (на двух видах животных)',
                        'Воспроизведённых лекарственных средств',
                        'Комбинированных лекарственных средств',
                    ],
                },
                {
                    title: 'Изучение фармакокинетических показателей субстанций in vitro',
                    details: [
                        'Связанной и свободной фракции соединения в плазме крови',
                        'Соединения в микросомальной фракции печени',
                        'Проницаемость на модели Caco-2',
                    ],
                },
                {
                    title: 'Доклинические исследования токсикокинетики',
                },
                {
                    title: 'Исследование биоэквивалентности препаратов',
                },
            ],
        },
    ]

    return (
        <ResearchDepartmentPage
            active="pharmacokinetics"
            title="Фармакокинетика, токсикокинетика, биоэквивалентность"
            blocks={orderedBlocks}
        />
    )
}
