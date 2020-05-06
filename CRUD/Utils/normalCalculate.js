// 引入报价计算函数
const utils = require('./utils')

// 转换规则
const transform = {
  foldTimes (foldTimesStr) {
    const reg = /\d+/g
    return foldTimesStr.match(reg)[0]
  },
  paperClass (foldTimesStr) {
    const regA = /大度/g
    const regB = /正度/g
    return foldTimesStr.replace(regA, 'A').replace(regB, 'B')[0]
  }
}

function normalCalculate (urlObj) {
  const allOptions = JSON.parse(urlObj.allOptions)
  console.log('allOptions', allOptions)

  const prices = {
    // 封面：utils.paperAmount * utils.paperUnitPrice
    cover: utils.paperAmount('cover', allOptions.pages, transform.foldTimes(allOptions.foldTimes), allOptions.albums) * utils.paperUnitPrice(allOptions.cover, transform.paperClass(allOptions.foldTimes)),
    // 内页：封面：utils.paperAmount * utils.paperUnitPrice
    content: utils.paperAmount('content', allOptions.pages, transform.foldTimes(allOptions.foldTimes), allOptions.albums) * utils.paperUnitPrice(allOptions.content, transform.paperClass(allOptions.foldTimes)),
    // 版面设计费
    layoutDesign: utils.layoutDesign(allOptions.pages, allOptions.layout),
    // 胶片费
    filmDesign: utils.filmDesign(allOptions.pages, allOptions.film),
    // 晒PS版费
    exposurePS: utils.exposurePS(allOptions.pages, transform.foldTimes(allOptions.foldTimes), allOptions.ps),
    // 打样费
    proofing: utils.proofing(allOptions.pages),
    // 打印封面
    printingCover: utils.printing('cover'),
    // 打印内页
    printContent: utils.printing('content'),
    // 装订费
    bookbinding: utils.bookBinding(allOptions.albums, allOptions.pages, transform.foldTimes(allOptions.foldTimes)),
    // 覆膜费
    laminating: utils.laminating(transform.paperClass(allOptions.foldTimes)),
    // 过塑费
    plastic: utils.plastic(allOptions.albums, transform.foldTimes(allOptions.foldTimes), allOptions.pages),
    packing: utils.packing(allOptions.albums, 50, 'kraftPaper')
  }

  console.log(prices)

  // 计算基本报价总价
  let totalPrices = 0
  for (const key in prices) {
    if (prices.hasOwnProperty(key)) {
      totalPrices += prices[key]
    }
  }

  console.log(totalPrices.toFixed(2))
  return totalPrices.toFixed(2)
}

module.exports = normalCalculate
