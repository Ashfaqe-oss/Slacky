/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    experimental: {
        appDir: true,
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        domains: [
                'res.cloudinary.com',
                'avatars.githubusercontent.com',
                'lh3.googleusercontent.com'
            ] //need to resolbe where images come from to use next Image component
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig