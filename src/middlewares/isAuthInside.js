const isAuthInside = async (ctx, next) => {
  const gatewayToken = ctx.header['g-token'];
  if (gatewayToken && gatewayToken === process.env.GATEWAY_TOKEN) {
    return next();
  }
  const error = { statusCode: 401, message: 'missing token' };
  throw error;
};

module.exports = isAuthInside;
