/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('found_comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    comment: {
      type: 'TEXT',
      notNull: true,
    },

    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },

    found_item_id: {
      type: 'TEXT',
      notNull: true,
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('found_comments');
};
