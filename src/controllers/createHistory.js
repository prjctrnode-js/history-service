const db = require('../db/models');
const updateOrCreate = require('../helpers/updateOrCreate');

const createHistory = async (userId, videoId) => ({
    status: 200,
    body: await updateOrCreate(
      db.History,
      { videoId, userId },
      {
        videoId,
        userId,
      }
    ),
  });

module.exports = createHistory;
