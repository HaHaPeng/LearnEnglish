const express = require('express')
const bodyParser = require('body-parser')
// const db = require('./node/mongodb/connect')
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

//路由
app.use('/', (req, res) => {
    res.sendFile(__dirname + '/react/dist/index.html')
})

//端口
app.listen(8091, () => {
    console.log("启动成功")
})