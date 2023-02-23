/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    publicRuntimeConfig: {
        apiURL: 'http://localhost:8000/',
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
