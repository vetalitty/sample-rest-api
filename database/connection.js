const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const uuid = require('uuid');
const bcrypt = require('bcrypt');

db.defaults({
  user: [{
    id: uuid.v4(),
    username: 'admin',
    password: bcrypt.hashSync('root', 10),
    type: 'ADMIN'
  }],
  publicData: [{
    id: 1,
    data: 'PUBLIC data in db'
  }],
  privateData: [{
    id: 1,
    data: 'PRIVATE data in db'
  }],
  count: 0
})
  .write();

module.exports = db;
