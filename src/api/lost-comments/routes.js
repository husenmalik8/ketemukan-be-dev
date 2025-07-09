const routes = (handler) => [
  {
    method: 'POST',
    path: '/losts/{id}/comments',
    handler: handler.postLostHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
  {
    method: 'GET',
    path: '/losts/{id}/comments',
    handler: handler.getLostByIdHandler,
  },
];

module.exports = routes;
