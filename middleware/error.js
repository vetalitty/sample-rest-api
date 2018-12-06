const _ = require('lodash');
const http = require('http');
const constants = require('../lib/constants');

Object.entries(http.STATUS_CODES).forEach(([key, value]) => {
  constants.HTTP[key] = value
    .toUpperCase()
    .replace(/\s/igm, '_');
});

module.exports = async(ctx, next) => {
  try {
    await next();
    if (Number(ctx.response.status) === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.type = 'application/json';

    if (!ctx.response.body) {
      ctx.response.body = {errors: err};
    }
    console.error(err);

    ctx.status = _.defaultTo(err.status, 500);
  } finally {
    if (ctx.body && typeof (ctx.body.code) === 'undefined') {
      ctx.body.code = constants.HTTP[String(ctx.status)];
    }
  }
};
