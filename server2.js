const http = require('http')
const url = require('url')
const querystring = require('querystring')

// 引入SQL查询函数
const retrieveSQL = require('./CRUD/retrieveSQL.js')
// 引入SQL更新函数
const updateSQL = require('./CRUD/updateSQL.js')
// 引入SQL插入函数
const createSQL = require('./CRUD/createSQL.js')
// 引入SQL删除函数
const deleteSQL = require('./CRUD/deleteSQL.js')

// 引入报价计算控制器
const calculator = require('./CRUD/Utils/management')

// 数据库连接配置
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  port: '3306',
  database: 'QUOTE'
}

// 创建 http 服务器
const server = http.createServer((req, res) => {
// 获取 http 请求中的查询参数
  const httpQuery = url.parse(req.url).query
  // 将查询参数转化为对象
  const urlObj = querystring.parse(httpQuery)

  console.log(urlObj)

  switch (urlObj.manipulation) {
    case 'create':
      // 增
      createSQL(urlObj, res, dbConfig)
      break

    case 'retrieve':
      // 查
      retrieveSQL(urlObj, res, dbConfig)
      break

    case 'update':
      // 改
      updateSQL(urlObj, res, dbConfig)
      break

    case 'delete':
      // 删
      deleteSQL(urlObj, res, dbConfig)
      break

    // 计算报价
    case 'calculate':
      calculator(urlObj, res, dbConfig)
      break

    default:
      console.log('Error: switch doesn\'t match any case.')
  }
})

server.listen(8080)
