class PlaylistsHandler {
  constructor(songsService, service, validator) {
    this._songsService = songsService;
    this._service = service;
    this._validator = validator;
  }

  postPlaylistHandler = async (request, h) => {
    this._validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  };
}

module.exports = PlaylistsHandler;
