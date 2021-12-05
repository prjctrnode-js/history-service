module.exports = updateOrCreate = async (model, where, newItem) => {
  const foundItem = await model.findOne({ where });
  if (!foundItem) {
    const item = await model.create(newItem);
    return { success: true, message: 'history create', data: item };
  }
  const item = await model.update(newItem, { where });
  return {
    success: true,
    message: 'history update',
    data: await model.findOne({ where }),
  };
};
