const path = require('path');
const _ = require('lodash');

const ROOT = path.resolve(__dirname, '../');
const NODE_ENV = _.defaultTo(process.env.NODE_ENV, 'development');

/**
 * Generate config
 *
 * return {object} config
 * */
function getConfig() {
  let config;

  switch (NODE_ENV) {
    case 'production':
      config = getProductionConfig();
      break;
    case 'development':
      config = getDevelopmentConfig();
      break;
    default:
      config = getDevelopmentConfig();
  }
  return config;
}

/**
 * Generate production config
 *
 * return {object} config
 * */
function getProductionConfig() {
  return {
    server: {
      port: _.defaultTo(process.env.PORT, 3333),
      host: _.defaultTo(process.env.HOST, 'localhost'),
      root: ROOT,
    },
    cors: {
      origin: '*',
      exposeHeaders: ['Authorization'],
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowHeaders: ['Authorization', 'Content-Type'],
      keepHeadersOnError: true,
    },
    bodyParser: {
      enableTypes: ['json', 'form'],
    },
    jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'default_secret'),
    jwtOptions: {
      expiresIn: '7d',
    },
  };
}

/**
 * Generate development config
 *
 * return {object} config
 * */
function getDevelopmentConfig() {
  return {
    server: {
      port: _.defaultTo(process.env.PORT, 3333),
      host: _.defaultTo(process.env.HOST, 'localhost'),
      root: ROOT,
    },
    cors: {
      origin: '*',
      exposeHeaders: ['Authorization'],
      credentials: true,
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowHeaders: ['Authorization', 'Content-Type'],
      keepHeadersOnError: true,
    },
    bodyParser: {
      enableTypes: ['json', 'form'],
    },
    jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'default_secret'),
    jwtOptions: {
      expiresIn: '7d',
    },
  };
}

module.exports = getConfig();
