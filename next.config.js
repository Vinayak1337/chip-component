/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ['robohash.org']
	}
};

module.exports = nextConfig;
