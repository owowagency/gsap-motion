/* eslint-disable @typescript-eslint/no-require-imports */

const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
});

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
    // trim off `<owner>/`
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
}

module.exports = withNextra({
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    assetPrefix,
    basePath,
    images: {
        unoptimized: true,
    },
});
