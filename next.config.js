/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {},
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    }
};