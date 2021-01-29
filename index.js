var express = require('express')
var router = express.Router()
var request = require('request')
var fs = require('fs') // 载入fs模块
/* GET home page. */
router.post('/*', function (req, res, next) {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
    //获取请求地址信息
    let path = req.originalUrl
    let handlePath = path.replace(/\//g, '+')
    handlePath = handlePath.replace(/\?/g, '!')
    handlePath = handlePath.substr(1) //保存文件的文件名
    console.log(handlePath)
    //根据请求地址发送真实请求
    let url = `http://172.172.32.123:9527${req.originalUrl}`

    request(
        {
            method: 'post',
            url: url,
            headers: {
                //设置请求头
                ...req.headers,
            },
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body)
                res.send(data)
                //保存响应数据
                fs.writeFile(
                    `./chache-data-wrap/${handlePath}.txt`,
                    JSON.stringify(data),
                    function (err) {
                        if (err) {
                            throw err
                        }
                    }
                )
            } else {
                //写入响应体
                fs.readFile(
                    `./chache-data-wrap/${handlePath}.txt`,
                    'utf-8',
                    function (err, data) {
                        if (data) {
                            // console.log(res)
                            var body = JSON.parse(data)
                            console.log(body)
                            res.send(body)
                        }
                    }
                )
            }
        }
    )
})
//获取用户信息
router.get('/*', function (req, res, next) {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
    //获取请求地址信息
    let path = req.originalUrl
    let handlePath = path.replace(/\//g, '+')
    handlePath = handlePath.replace(/\?/g, '!')
    handlePath = handlePath.substr(1) //保存文件的文件名
    console.log(handlePath)
    //根据请求地址发送真实请求
    let url = `http://172.172.32.124:9527${req.originalUrl}`

    request(
        {
            method: 'post',
            url: url,
            headers: {
                //设置请求头
                ...req.headers,
            },
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body)
                res.send(data)
                //保存响应数据
                fs.writeFile(
                    `./chache-data-wrap/${handlePath}.txt`,
                    JSON.stringify(data),
                    function (err) {
                        if (err) {
                            throw err
                        }
                    }
                )
            } else {
                //写入响应体
                fs.readFile(
                    `./chache-data-wrap/${handlePath}.txt`,
                    'utf-8',
                    function (err, data) {
                        if (data) {
                            // console.log(res)
                            var body = JSON.parse(data)
                            console.log(body)
                            res.send(body)
                        }
                    }
                )
            }
        }
    )
})

module.exports = router
