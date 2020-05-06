const mysql = require('mysql')

function deleteSQL (urlObj, httpResponse, dbConfig) {
  // 连接数据库
  const connection = mysql.createConnection(dbConfig)
  // 创建连接
  connection.connect()
  // 请求参数
  console.log(urlObj)
  const time = urlObj.time

  const table_Information_brief = 'Information_brief'
  const table_Information_detail = 'Information_detail'
  const table_Information_params = 'Information_params'

  // 查询SQL语句
  const sql1 = `DELETE FROM ${table_Information_detail} WHERE time=${time}`
  const sql2 = `DELETE FROM ${table_Information_params} WHERE time=${time}`
  const sql3 = `DELETE FROM ${table_Information_brief} WHERE time=${time}`

  deleteFactory(sql1, connection)
  deleteFactory(sql2, connection)
  deleteFactory(sql3, connection, httpResponse)
}

/**
 * 删除历史记录工厂函数
 * @param {string} sql sql语句
 * @param {object} connection 数据库连接
 * @param {object} httpResponse http响应
 */
function deleteFactory (sql, connection, httpResponse) {
  setTimeout(() => {
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('[DELETE ERROR] - ', err.message)
      }

      if (httpResponse) {
        httpResponse.writeHead(200, {
          'Content-Type': 'application/json;charset=utf-8'
        })
        httpResponse.write('ok')
        httpResponse.end()

        connection.end()
      }
    })
  }, 100)
}

module.exports = deleteSQL
