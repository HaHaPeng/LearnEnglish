const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '118.25.177.14',
  user     : 'english',
  password : '@pp123456',
  database : 'english'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection



// connection.end();