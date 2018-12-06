const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { jwtSecret, jwtOptions } = require('../config');

function generateJWT(user = {}) {
  return Object.assign({}, user, {
    token: jwt.sign({
      sub: _.pick(user, ['id', 'username', 'type']),
    }, jwtSecret, jwtOptions),
  });
}

module.exports.generateJWT = generateJWT;
