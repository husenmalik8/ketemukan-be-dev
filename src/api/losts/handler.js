class LostsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postLostHandler = async (request, h) => {
    this._validator.validateLostPayload(request.payload);

    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const lostId = await this._service.addLost({ name, owner });

    const response = h.response({
      status: 'success',
      message: 'Lost item berhasil ditambahkan',
      data: {
        lostId,
      },
    });
    response.code(201);
    return response;
  };
}

module.exports = LostsHandler;
