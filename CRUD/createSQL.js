const mysql = require('mysql')

/**
 * 更新数据
 * @param {object} urlObj url查询参数
 * @param {object} httpResponse http响应方法
 * @param {object} dbConfig 数据库连接配置
 */
function createSQL (urlObj, httpResponse, dbConfig) {
  // 连接数据库
  const connection = mysql.createConnection(dbConfig)
  const allOptions = JSON.parse(urlObj.allOptions)
  console.log('allOptions', allOptions)

  // 创建连接
  connection.connect()

  const table_Information_brief = 'Information_brief'
  const table_Information_detail = 'Information_detail'
  const table_Information_params = 'Information_params'

  const sql1 = `INSERT INTO ${table_Information_brief}(\`time\`,\`customer_name\`,\`quote_type\`,\`quote_amount\`) VALUES(${allOptions.timeStamp},${allOptions.customer_name},${allOptions.quoteType},${allOptions.quoteAmount})`

  const sql2 = `INSERT INTO ${table_Information_detail}(\`time\`,\`cover\`,\`cover_weight\`,\`content\`,\`content_weight\`,\`fold_times\`,\`pages\`,\`albums\`,\`book_binding\`,\`delivery\`,\`class\`) VALUES(${allOptions.timeStamp},${allOptions.cover},${allOptions.coverWeight},${allOptions.content},${allOptions.contentWeight},${allOptions.foldTimes},${allOptions.pages},${allOptions.albums},${allOptions.bookBinding},${allOptions.delivery},${allOptions.paperClass})`

  const sql3 = `INSERT INTO ${table_Information_params}(\`time\`,\`design\`,\`film\`,\`exposure\`,\`proof\`) VALUES(${allOptions.timeStamp},${allOptions.design},${allOptions.film},${allOptions.exposure},${allOptions.proof})`

  console.log(sql1, '\n')
  console.log(sql2, '\n')
  console.log(sql3, '\n')

  setTimeout(() => {
    // 增
    connection.query(sql1, function (err, result) {
      if (err) {
        console.log('[CREATE ERROR] - ', err.message)
      }
      /*
        console.log('--------------------------SELECT----------------------------')
        console.log(result);
        console.log('------------------------------------------------------------\n\n')

*/
    })
  }, 100)

  setTimeout(() => {
    // 增
    connection.query(sql2, function (err, result) {
      if (err) {
        console.log('[CREATE ERROR] - ', err.message)
      }
      /*
        console.log('--------------------------SELECT----------------------------')
        console.log(result);
        console.log('------------------------------------------------------------\n\n')

*/
    })
  }, 100)

  setTimeout(() => {
    // 增
    connection.query(sql3, function (err, result) {
      if (err) {
        console.log('[CREATE ERROR] - ', err.message)
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
      httpResponse.write('ok')
      httpResponse.end()

      connection.end()
    })
  }, 100)
}

module.exports = createSQL
