const mysql = require('mysql')

// 引入普通类型报价计算函数
const normalCalculate = require('./normalCalculate')
// 引入精准类型报价计算函数
const accurateCalculate = require('./accurateCalculate')

/**
 * 计算函数控制器
 * @param {object} urlObj url查询参数
 * @param {object} httpResponse http响应方法
 * @param {object} dbConfig 数据库连接配置
 */
function calculator (urlObj, httpResponse, dbConfig) {
  let totalMoney = 0
  switch (urlObj.quoteType) {
    case 'normal': totalMoney = normalCalculate(urlObj)
      break
    case 'accurate': totalMoney = accurateCalculate(urlObj)
      break
    default:
      console.log(`error! quoteType: ${urlObj.quoteType}. Doesn't match quote type.`)
  }

  httpResponse.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8'
  })
  httpResponse.write(totalMoney)
  httpResponse.end()
}

module.exports = calculator
