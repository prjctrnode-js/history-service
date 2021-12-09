const db = require('../db/models');
const updateOrCreate = require('../helpers/updateOrCreate')

const createHistory = async (ctx) => {
  const { userId, videoId } = ctx.request.body;
  ctx.body = await updateOrCreate(
    db.History,
    { videoId },
    {
      videoId,
      userId,
    }
  );
};

module.exports = createHistory;
