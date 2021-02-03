const connection = require('../mysql/connect.dev')

//查
const getWords = function() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from word', (error, results, fields) => {
            // if (error) throw error;
            resolve(JSON.stringify(results))
        });
        // connection.end();
    })
}

//增
const addWord = function({word, date}) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO word ( word, date )
            VALUES
        ( '${word}', '${date}');`, (error, results, fields) => {
            // if (error) throw error;
            resolve(JSON.stringify({status: true}))
        })
    })
}

module.exports.getWords = getWords
module.exports.addWord = addWord