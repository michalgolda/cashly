/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    publicRuntimeConfig: {
        apiURL: process.env.API_URL,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/expenses',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
