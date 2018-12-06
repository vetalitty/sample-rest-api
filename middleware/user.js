const { has } = require('lodash');
const db = require('../database');

module.exports = async (ctx, next) => {
  if (has(ctx, 'state.jwt.sub.id')) {
    ctx.state.user = await db.user.isUserExist(ctx.state.jwt.sub.username);
  }

  return next();
};
