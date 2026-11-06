import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import codeTheme from './app/writing/codeTheme.mjs';

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
        // Fragment shaders are imported as plain strings
        config.module.rules.push({
            test: /\.frag$/,
            type: 'asset/source',
        });
        return config;
    },
};

// Writing posts are MDX; code blocks are highlighted at build time (no client JS)
const withMDX = createMDX({
    options: {
        rehypePlugins: [[rehypePrettyCode, { theme: codeTheme, keepBackground: false }]],
    },
});

export default withMDX(nextConfig);
