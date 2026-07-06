export interface NavItem {
  label: string
  /** id of the target section element */
  target: string
}

export const navItems: NavItem[] = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Services', target: 'services' },
  { label: 'Experience', target: 'experience' },
  { label: 'Works', target: 'works' },
  { label: 'Blog', target: 'blog' },
  { label: 'Contact', target: 'contact' },
]
