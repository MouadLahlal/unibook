module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thebanco.it',
        port: '',
        pathname: '/public/uploads/books/9788808663856.jpg',
      },
    ],
  },

	webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
}
