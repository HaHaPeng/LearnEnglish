const express = require('express')
const router = express.Router()
const wordServer = require('../Api/wordApi')

router.get('/get', async (req, res) => {
    let message = ''
    let data = undefined
    let code = 'ok'
    await wordServer.getWords().then(result => {
        data = JSON.parse(result)
        message = '查询成功'
    }).catch(error => {
        code = 'fail'
        message = '查询失败'
    })
    res.send({ code, message, data })
})

router.post('/add', async (req, res) => {
    const { word, date } = req.body
    let message = ''
    let data = undefined
    let code = 'ok' 
    if(!word) {
        code = 'fail'
        message = '内容不能为空'
    }
    if(!(/^[a-zA-Z]{1,}$/).test(word)) {
        code = 'fail'
        message = '内容只能为英文'
    }
    if(code === 'ok') {
        try {
            await wordServer.addWord({word, date}).then(result => {
                data = JSON.parse(result)
                if(data.status) {
                    message = '添加单词成功'
                } else {
                    throw '添加单词失败'
                }
            }).catch(error => {
                throw error
            })
        } catch (error) {
            console.error(error)
            code = 'fail'
            message = '添加单词失败'
        }
    }
    res.send({ code, message, data })
})

module.exports = router