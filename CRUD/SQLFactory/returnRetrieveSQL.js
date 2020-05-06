function SQLSwitch (urlObj) {
  let sql = ''

  switch (urlObj.mark) {
    case 'normal_retrieve':
      sql = `SELECT * FROM ${urlObj.table}`
      break

    case 'other_unit_prices_retrieve':
      sql =
        'SELECT design AS 设计费, film AS 菲林, PS AS PS版, proof AS 打样费, color_ream AS 色令, machine AS 开机费, bookbinding AS 装订费 FROM OTHER_UNIT_PRICES'
      break

    case 'union_retrieve': {
      // 报价历史记录表查询
      const tableName1 = 'Information_detail'
      const tableName2 = 'Information_params'

      sql = `SELECT * FROM ${urlObj.table} brief JOIN ${tableName1} detail ON brief.time=detail.time JOIN ${tableName2} params ON brief.time=params.time WHERE brief.time=${urlObj.unionOption}`
      console.log('sql', sql)
    }
      break

    case 'history_retrieve': {
      const sortType = urlObj.order || 'DESC'
      // 普通表查询
      sql = `SELECT * FROM ${urlObj.table} ORDER BY \`index\` ${sortType}`
    }
      break

    default:
      sql = `SELECT * FROM ${urlObj.table}`
  }

  return sql
}

module.exports = SQLSwitch
