export interface TimelineEntry {
  period: string
  title: string
  description: string
}

const description =
  'Lorem ipsum dolor sit amet quo ei simul congue exerci ad nec admodum perfecto.'

export const education: TimelineEntry[] = [
  { period: '2019 - Present', title: 'Academic Degree', description },
  { period: '2017 - 2013', title: 'Bachelor’s Degree', description },
  { period: '2013 - 2009', title: 'Honours Degree', description },
]

export const experience: TimelineEntry[] = [
  { period: '2019 - Present', title: 'Web Designer', description },
  { period: '2017 - 2013', title: 'Front-End Developer', description },
  { period: '2013 - 2009', title: 'Back-End Developer', description },
]
