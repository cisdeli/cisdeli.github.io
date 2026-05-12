/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    basePath: "",
    assetPrefix: "",
    images: { unoptimized: true },
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name][ext]',
            },
        });
        return config;
    },
};

module.exports = nextConfig;
