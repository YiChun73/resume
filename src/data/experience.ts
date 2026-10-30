// Timeline order; period, title and description come from the `experience`
// locale messages.
export const educationIds = ['nchu', 'ncyu', 'tnssh'] as const
export const workIds = ['fengcai', 'nttData', 'fangdiwang'] as const

export type EducationId = (typeof educationIds)[number]
export type WorkId = (typeof workIds)[number]
