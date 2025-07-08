class LostsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postLostHandler = async (request, h) => {
    this._validator.validateLostPayload(request.payload);

    const { title, shortDesc, description, lostDate } = request.payload;
    const { id: userId } = request.auth.credentials;

    const lostId = await this._service.addLost({
      title,
      shortDesc,
      description,
      lostDate,
      userId,
    });

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
