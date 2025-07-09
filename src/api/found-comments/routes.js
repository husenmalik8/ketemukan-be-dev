const routes = (handler) => [
  {
    method: 'POST',
    path: '/found/{id}/comments',
    handler: handler.postFoundCommentHandler,
    options: {
      auth: 'ketemukan_jwt',
    },
  },
];

module.exports = routes;
