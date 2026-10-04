export const site = {
  name: 'Luis Torres',
  credential: 'PhD',
  fullName: 'Luis Torres, PhD',
  roles: ['Medical Physicist', 'Scientific Solutions Engineer'],
  description:
    'Luis Torres, PhD: medical physicist and scientific solutions engineer building software for MRI research.',
  email: 'luigibytes@gmail.com',
  location: 'North Carolina',
  employer: { name: 'Flywheel', url: 'https://flywheel.io' },
  links: {
    github: 'https://github.com/ltorres6',
    gitlab: 'https://gitlab.com/luistorres2',
    scholar: 'https://scholar.google.com/citations?user=EfaQZA8AAAAJ',
  },
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/work/', label: 'Work' },
  { href: '/publications/', label: 'Publications' },
  { href: '/resume/', label: 'Résumé' },
  { href: '/recipes/', label: 'Recipes' },
] as const;
