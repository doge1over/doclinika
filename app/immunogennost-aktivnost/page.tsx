import type { Metadata } from 'next'
import ResearchDepartmentPage, { type ResearchBlock } from '@/components/ResearchDepartmentPage'
import content from '@/data/research-immunogenicity.json'

export const metadata: Metadata = {
    title: 'Иммуноактивность | ДОМ ФАРМАЦИИ',
    description: 'Оценка иммуноактивности in vitro и in vivo.',
}

export default function ImmunogenicityActivityPage() {
    const blocks = content as ResearchBlock[]
    const publications = blocks.find((block) => block.kind === 'publications')
    const orderedBlocks = [
        ...(publications ? [publications] : []),
        {
            kind: 'paragraph' as const,
            text: 'При выполнении ДКИ по изучению фармакологической активности необходимо аналитическое сопровождение, направленное на изучение биомаркеров формирования патологий и эффективности фармакологического воздействия.',
        },
        { kind: 'immuno-overview' as const },
        {
            kind: 'regulations' as const,
            title: 'Регуляторные документы',
            items: [
                'Immunogenicity Testing of Therapeutic Protein Products — Developing and Validating Assays for Anti-Drug Antibody Detection. Guidance for Industry. Center for Biologics Evaluation and Research, FDA, 2019;',
                'EMEA/CHMP/BMWP/14327/2006 Rev. 1. Guideline on Immunogenicity Assessment of Therapeutic Proteins. EMA, 2017;',
                'Решение Совета ЕЭК №89 «Об утверждении Правил проведения исследований биологических лекарственных средств Евразийского экономического союза» от 03.11.2016.',
            ],
        },
    ] satisfies ResearchBlock[]

    return (
        <ResearchDepartmentPage
            active="immunogenicity"
            title="Иммуноактивность. Оценка специфической активности in vitro и in vivo"
            blocks={orderedBlocks}
        />
    )
}
