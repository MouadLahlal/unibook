module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thebanco.it',
        port: '',
        pathname: '/public/uploads/books/9788808663856.jpg',
      },
      {
        protocol: 'https',
        hostname: 'img.redbull.com',
        port: '',
        pathname: '/images/c_crop,x_1415,y_0,h_4313,w_3235/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2023/10/26/hatws0pulmah0avzeqba/bello-figo-red-bull-posse'
      }
    ],
    domains: [
      'bce.mondadorieducation.it'
    ]
  },

	webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
}
