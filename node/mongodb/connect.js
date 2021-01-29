const mongoose = require('mongoose');
mongoose.connect('mongodb://118.25.177.14/word', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("链接成功")
});