/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('lost_comments', {
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

    lost_item_id: {
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
  pgm.dropTable('lost_comments');
};
