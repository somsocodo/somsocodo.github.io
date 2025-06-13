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
	}
];
