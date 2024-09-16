export interface Project {
  title: string;
  description: string;
  languages: string[];
  technologies: string[];
  links: string[];
}

export const projects: Project[] = [
  {
    title: 'somsocodo.github.io',
    description: 'This website. Integrates music using SoundCloud widget API hackery.',
    languages: ['typescript', 'html/css'],
    technologies: ['node', 'react', 'mui'],
    links: ['https://github.com/somsocodo/somsocodo.github.io']
  },
  {
    title: 'mem-kernel-module',
    description: 'A linux kernel module for reading usermode process memory using IOCTL.',
    languages: ['c', 'c++', 'rust'],
    technologies: ['linux'],
    links: ['https://github.com/somsocodo/mem-kernel-module']
  },
  {
    title: 'Hauraki Coromandel Travel App',
    description:
      "Regional app & content management system for Hauraki Coromandel. Integrates real-time information on road travel, trails, tide times and weather with a comprehensive guide to the area's offerings. ",
    languages: ['typescript', 'php'],
    technologies: ['react', 'ionic', 'drupal', 'docker'],
    links: [
      'https://play.google.com/store/apps/details?id=nz.co.groundtruth.coromandel',
      'https://apps.apple.com/th/app/hauraki-coromandel-travel-app/id6466134046'
    ]
  }
];
