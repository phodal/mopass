const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/db.json');
const db = low(adapter);

db.defaults({ Items: '', Count: 0, ScannedCount: 0}).write();

function write(data) {
  db.set('Items', data.Items)
    .write();
  db.get('Count', data.Count)
    .write();
  db.get('ScannedCount', 0)
    .write();
}

function get(title) {
  return db.get('Items')
    .find({title: title})
    .write();
}

function create(pwdInfo) {
  return db.get('Items')
    .push(pwdInfo)
    .write();
}

function getAllTitle() {
  const data = db.get('Items').write();
  const titles = [];
  for (let i = 0; i < data.length;i++){
    titles.push(data[i].title)
  }

  return titles;
}

function checkTitleDuplicate(title) {
  if (get(title)) {
    return false;
  } else {
    return true;
  }
}

function getItemByTitle(title) {
  let result = get(title)
  if (result) {
    return result;
  } else {
    return '';
  }
}

const dbm = {
  write: write,
  get: get,
  getAllTitle: getAllTitle,
  getItemByTitle: getItemByTitle,
  create: create,
  checkTitleDuplicate: checkTitleDuplicate
};
module.exports = dbm;
