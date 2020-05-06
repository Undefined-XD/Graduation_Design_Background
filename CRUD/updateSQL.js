const mysql = require('mysql')

/**
 * 更新数据
 * @param {object} urlObj url查询参数
 * @param {object} httpResponse http响应方法
 * @param {object} dbConfig 数据库连接配置
 */
function updateSQL (urlObj, httpResponse, dbConfig) {
  // 连接数据库
  const connection = mysql.createConnection(dbConfig)

  // 创建连接
  connection.connect()

  // 修改选项中英文对照
  const itemNameMap = {
    设计费: 'design',
    菲林: 'film',
    PS版: 'PS',
    打样费: 'proof',
    色令: 'color_ream',
    开机费: 'machine',
    装订费: 'bookbinding'
  }

  let sql = ''
  // 根据查询目标构建查询语句
  if (urlObj.table === 'other_unit_prices') {
    sql = `UPDATE OTHER_UNIT_PRICES SET ${itemNameMap[urlObj.item]}=${urlObj.value} WHERE id=1`
  } else {
    console.log('unkown table need to be declared.')
  }

  // 改
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message)
      return
    }
    /*
        console.log('--------------------------SELECT----------------------------')
        console.log(result);
        console.log('------------------------------------------------------------\n\n')

*/
    httpResponse.writeHead(200, {
      'Content-Type': 'application/json;charset=utf-8'
    })
    httpResponse.write(JSON.stringify(result))
    httpResponse.end()

    connection.end()
  })
}

module.exports = updateSQL
