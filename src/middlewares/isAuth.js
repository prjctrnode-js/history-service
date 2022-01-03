
const isAuth = async (ctx, next) => {
  const gatewayToken = ctx.header['g-token'];
  if (gatewayToken && gatewayToken === process.env.GATEWAY_TOKEN) {
    return next();
  }
  const error = { statusCode: 401, message: 'error token' };
  throw error;
};

module.exports = isAuth;
