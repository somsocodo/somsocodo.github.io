import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'build',
	reactStrictMode: true,
	images: {
		unoptimized: true
	},
	redirects: async () => [
			{
				source: '/',
				destination: '/music',
				permanent: true,
			},
		],
};

export default nextConfig;
