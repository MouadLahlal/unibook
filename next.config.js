module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.infrastructureLogging = { debug: /PackFileCache/ };
        return config;
    },

    output: "standalone",
};
