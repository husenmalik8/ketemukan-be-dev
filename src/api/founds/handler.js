class FoundsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postFoundHandler = async (request, h) => {
    this._validator.validateFoundPayload(request.payload);

    const { title, shortDesc, description, foundDate } = request.payload;
    const { id: userId } = request.auth.credentials;

    const foundId = await this._service.addFound({
      title,
      shortDesc,
      description,
      foundDate,
      userId,
    });

    const response = h.response({
      status: 'success',
      message: 'Found item berhasil ditambahkan',
      data: {
        foundId,
      },
    });
    response.code(201);
    return response;
  };

  getFoundsHandler = async () => {
    const founds = await this._service.getFounds();
    return {
      status: 'success',
      data: {
        founds,
      },
    };
  };

  getFoundByIdHandler = async (request) => {
    const { id } = request.params;
    const detail = await this._service.getFoundById(id);
    const comments = await this._service.getFoundCommentsByFoundId(id);

    const foundDetail = { ...detail, comments };

    return {
      status: 'success',
      data: {
        foundDetail,
      },
    };
  };
}

module.exports = FoundsHandler;
