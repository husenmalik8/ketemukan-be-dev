const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const ServerError = require('../../exceptions/ServerError');
const InvariantError = require('../../exceptions/InvariantError');

class LostsService {
  constructor() {
    this._pool = new Pool();
  }

  async addLost({ title, shortDesc, description, lostDate, userId }) {
    const id = `lost-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO lost_items(id, title, short_desc, description, lost_date, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        title,
        shortDesc,
        description,
        lostDate,
        createdAt,
        updatedAt,
        userId,
      ],
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

  async getLosts() {
    const query = {
      text: 'SELECT id, title, short_desc, picture, lost_date FROM lost_items',
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    return result.rows;
  }

  async getLostById(id) {
    const query = {
      text: 'SELECT id, title, short_desc, description, picture, lost_date FROM lost_items WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      console.error(error);
      throw new ServerError('Internal server error');
    });

    if (!result.rows.length) {
      throw new NotFoundError('Lost item tidak ditemukan');
    }

    return result.rows[0];
  }
}

module.exports = LostsService;
