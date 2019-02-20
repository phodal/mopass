function pbcopy(data) {
  return new Promise(function(resolve, reject) {
    const proc = require('child_process').spawn('pbcopy');
    proc.on('error', function(err) {
      reject(err);
    });
    proc.on('close', function(err) {
      resolve();
    });
    proc.stdin.write(data);
    proc.stdin.end();
  })
}

module.exports.pbcopy = pbcopy;
