import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	distDir: 'build',
	reactStrictMode: true,
	images: {
		unoptimized: true
	}
};

export default nextConfig;
