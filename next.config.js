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
        return config;
    },
};
