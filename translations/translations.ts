export const translations = {
    ru: {
        // Header
        phone: '+7(812) 603-74-28',
        email: 'info@doclinika.ru',

        // Hero
        heroTitle: 'Доклинические исследования и разработка препаратов',
        heroDescription: 'Современная лабораторная база для полного цикла исследований. Более 20 лет опыта в фармацевтической отрасли.',
        newsButton: 'Новости и события',
        learnMoreButton: 'Узнать больше',

        // Cards
        card1Title: 'Доклинические исследования',
        card1Desc: 'Минимизация рисков при испытании на людях',

        card2Title: 'Гистология и патоморфология',
        card2Desc: 'Информативные методы диагностики патологий',

        card3Title: 'О нас',
        card3Desc: 'Информация о компании и достижениях',

        card4Title: 'Специалисты',
        card4Desc: 'Наша команда профессионалов',

        card5Title: 'Химико-аналитическая лаборатория',
        card5Desc: 'Методы исследования на всех этапах',

        card6Title: 'Разработка лекарственных форм',
        card6Desc: 'Целевая доставка субстанции',

        card7Title: 'Лаборатория микробиологии',
        card7Desc: 'Оценка эффективности препаратов',

        card8Title: 'Лабораторные животные',
        card8Desc: 'Здоровье и благополучие животных',

        card9Title: 'Обеспечение качества',
        card9Desc: 'Контроль качества исследований',

        card10Title: 'Политики',
        card10Desc: 'Нормативная документация',

        card11Title: 'Биохимия и гематология',
        card11Desc: 'Выявление патологий органов',

        card12Title: 'Сведения об организации',
        card12Desc: 'Образовательная деятельность',

        card13Title: 'Лицензии и сертификаты',
        card13Desc: 'Документы и удостоверения',

        card14Title: 'Фармакокинетика',
        card14Desc: 'Поиск активных ингредиентов',

        card15Title: 'Животные для исследований',
        card15Desc: 'Научный журнал',

        card16Title: 'Контакты',
        card16Desc: 'Свяжитесь с нами',

        card17Title: 'Новости',
        card17Desc: 'Актуальные события',

        card18Title: 'Провизорская служба',
        card18Desc: 'Учет и сохранность препаратов',

        card19Title: 'Вакансии',
        card19Desc: 'Присоединяйтесь к команде',

        // Footer
        footerInfo: 'Информация',
        footerAbout: 'О нас',
        footerNews: 'Новости',
        footerContacts: 'Контакты',
        footerOurContacts: 'Наши контакты',
        footerHowToGet: 'Как добраться',
        footerAddress: '188663, Россия, Ленинградская область, Всеволожский район, г.п. Кузьмоловский, Заводская улица, 3-245',
        footerCopyright: 'ДОМ ФАРМАЦИИ © 2022'
    },
    en: {
        // Header
        phone: '+7(812) 603-74-28',
        email: 'info@doclinika.ru',

        // Hero
        heroTitle: 'Preclinical Research and Drug Development',
        heroDescription: 'Modern laboratory facilities for a full research cycle. Over 20 years of experience in the pharmaceutical industry.',
        newsButton: 'News and Events',
        learnMoreButton: 'Learn More',

        // Cards
        card1Title: 'Preclinical Research',
        card1Desc: 'Risk minimization in human trials',

        card2Title: 'Histology and Pathomorphology',
        card2Desc: 'Informative methods for pathology diagnostics',

        card3Title: 'About Us',
        card3Desc: 'Company information and achievements',

        card4Title: 'Specialists',
        card4Desc: 'Our team of professionals',

        card5Title: 'Chemical-Analytical Laboratory',
        card5Desc: 'Research methods at all stages',

        card6Title: 'Drug Formulation Development',
        card6Desc: 'Targeted substance delivery',

        card7Title: 'Microbiology Laboratory',
        card7Desc: 'Drug efficacy assessment',

        card8Title: 'Laboratory Animals',
        card8Desc: 'Animal health and welfare',

        card9Title: 'Quality Assurance',
        card9Desc: 'Research quality control',

        card10Title: 'Policies',
        card10Desc: 'Regulatory documentation',

        card11Title: 'Biochemistry and Hematology',
        card11Desc: 'Organ pathology detection',

        card12Title: 'Organization Information',
        card12Desc: 'Educational activities',

        card13Title: 'Licenses and Certificates',
        card13Desc: 'Documents and credentials',

        card14Title: 'Pharmacokinetics',
        card14Desc: 'Active ingredient research',

        card15Title: 'Animals for Research',
        card15Desc: 'Scientific journal',

        card16Title: 'Contacts',
        card16Desc: 'Get in touch with us',

        card17Title: 'News',
        card17Desc: 'Current events',

        card18Title: 'Pharmaceutical Service',
        card18Desc: 'Drug accounting and storage',

        card19Title: 'Vacancies',
        card19Desc: 'Join our team',

        // Footer
        footerInfo: 'Information',
        footerAbout: 'About Us',
        footerNews: 'News',
        footerContacts: 'Contacts',
        footerOurContacts: 'Our Contacts',
        footerHowToGet: 'How to Get There',
        footerAddress: '188663, Russia, Leningrad Region, Vsevolozhsk District, Kuzmolovsky, Zavodskaya Street, 3-245',
        footerCopyright: 'DOM FARMATSII © 2022'
    }
}

export type Language = 'ru' | 'en'
export type TranslationKeys = keyof typeof translations.ru