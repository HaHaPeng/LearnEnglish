const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//格式化参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//静态文件
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
app.use(express.static('./react/dist', options))

//解决跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//路由
// app.use('/', (req, res) => {
//     res.sendFile(__dirname + '/react/dist/index.html')
// })

//单词路由
const wordRouter = require('./node/router/wordRouter')
app.use('/word', wordRouter)

//端口
app.listen(8091, () => {
    console.log("启动成功")
})