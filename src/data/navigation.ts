// Section ids in page order; labels come from the `nav` locale messages.
export const navTargets = ['home', 'about', 'expertise', 'experience', 'works', 'blog', 'contact'] as const

export type NavTarget = (typeof navTargets)[number]
