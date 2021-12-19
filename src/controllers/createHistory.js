const db = require('../db/models');
const updateOrCreate = require('../helpers/updateOrCreate')

const createHistory = async (userId, videoId) => {
  return{
    status: 200,
    body :await updateOrCreate(
      db.History,
      { videoId },
      {
        videoId,
        userId,
      }
    )
  }
  
};

module.exports = createHistory;
