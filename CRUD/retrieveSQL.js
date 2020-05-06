const mysql = require('mysql')
const returnRetrieveSQL = require('./SQLFactory/returnRetrieveSQL')

/**
 * 查询数据
 * @param {object} urlObj url查询参数
 * @param {object} httpResponse http响应方法
 * @param {object} dbConfig 数据库连接配置
 */
function retrieveSQL (urlObj, httpResponse, dbConfig) {
  // 连接数据库
  const connection = mysql.createConnection(dbConfig)

  // 创建连接
  connection.connect()

  const sql = returnRetrieveSQL(urlObj)
  /*
  // 根据查询目标构建查询语句
  if (urlObj.table === 'other_unit_prices') {
    sql = 'SELECT design AS 设计费, film AS 菲林, PS AS PS版, proof AS 打样费, color_ream AS 色令, machine AS 开机费, bookbinding AS 装订费 FROM OTHER_UNIT_PRICES'
  } else {
    if (urlObj.unionOption === undefined) {
      // const sortType = urlObj.order || 'DESC'
      // 普通表查询
      // sql = `SELECT * FROM ${urlObj.table} ORDER BY \`index\` ${sortType}`
      sql = `SELECT * FROM ${urlObj.table}`
    } else {
      // 报价历史记录表查询
      const tableName1 = 'Information_detail'
      const tableName2 = 'Information_params'

      sql = `SELECT * FROM ${urlObj.table} brief JOIN ${tableName1} detail ON brief.time=detail.time JOIN ${tableName2} params ON brief.time=params.time WHERE brief.time=${urlObj.unionOption}`
    }
  }
   */
  // SELECT DISTINCT * FROM Information_brief brief JOIN Information_detail detail ON brief.time=detail.time JOIN Information_params params ON brief.time=params.time WHERE brief.time=1586419733659;

  // 查
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message)
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

module.exports = retrieveSQL
