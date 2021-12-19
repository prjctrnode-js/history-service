const db = require('../db/models');

const getHistory = async (id, limit) => {
  const data = await db.History.findAll({
    where: {
      userId: id,
    },
    limit,
  });
  return {
    status: 200,
    body: {
      success: true,
      message: 'Success',
      data,
    },
  };
};

module.exports = getHistory;
