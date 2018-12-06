const uuid = require('uuid');
const db = require('./connection');

module.exports = {
  isUserExist(username) {
    const user = db.get('user')
      .find({username})
      .value();
    if (user) return user;
  },
  register(user) {
    db.get('user')
      .push(user)
      .write();
  },
  getPublicData() {
    return db.get('publicData')
      .value();
  },
  getPrivateData() {
    return db.get('privateData')
      .find({id: 1})
      .value();
  },
};
