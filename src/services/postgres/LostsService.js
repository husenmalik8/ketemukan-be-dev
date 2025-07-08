const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');

class LostsService {
  constructor() {
    this._pool = new Pool();
  }

  async addLost({ name, owner }) {
    const id = `lost-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO losts(id, name, owner, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, createdAt, updatedAt],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    const resultId = result.rows[0].id;

    if (!resultId) {
      throw new InvariantError('Lost item gagal ditambahkan');
    }

    return resultId;
  }
}

module.exports = LostsService;
