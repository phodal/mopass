const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/db.json');
const db = low(adapter);

function write(data) {
  db.defaults(data).write();
}

function get(title) {
  return db.get('Items')
    .find({title: title})
    .write();
}

function checkTitleDuplicate(title) {
  if (get(title)) {
    return false;
  } else {
    return true;
  }
}

const dbm = {
  write: write,
  get: get,
  checkTitleDuplicate: checkTitleDuplicate
};
module.exports = dbm;
