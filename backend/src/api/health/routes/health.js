module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.healthCheck',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
