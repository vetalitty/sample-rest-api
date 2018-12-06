const uuid = require('uuid');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { generateJWT } = require('../lib/utils');
const db = require('../database');

module.exports = {
  async register(ctx) {
    const { body } = ctx.request;

    const salt = await bcrypt.genSalt(10);
    let user = {};
    user.id = uuid.v4();
    user.username = body.username;
    user.password = await bcrypt.hash(body.password, salt);
    user.type = 'ADMIN';

    const isUserExist = await db.user.isUserExist(user.username);
    if (isUserExist) {
      ctx.throw(422, 'user is already exist');
    }

    await db.user.register(user);

    user = generateJWT(user);

    ctx.body = { user: _.omit(user, ['password']), message: 'success' };
  },
  async login(ctx) {
    let body = ctx.request.body || {};

    const user = {};
    user.username = body.username;
    user.password = body.password;

    let isUserExist = await db.user.isUserExist(user.username);
    if (!isUserExist) {
      ctx.throw(422, 'user doesn\'t exist');
    }
    let dbUser = isUserExist;

    const isPasswordValid = await bcrypt.compare(body.password, dbUser.password);
    if (!isPasswordValid) {
      ctx.throw(422, 'invalid password');
    }

    dbUser = generateJWT(dbUser);

    ctx.body = { user: _.omit(dbUser, ['password', 'expires']) };
  },
  async publicRoute(ctx) {
    const data = db.user.getPublicData();
    ctx.body = {data};
  },
  async privateRoute(ctx) {
    const data = db.user.getPrivateData();
    ctx.body = {data};
  },
};
