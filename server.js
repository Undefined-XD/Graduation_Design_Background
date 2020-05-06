const http = require('http')
var mysql  = require('mysql');  

var querystring = require('querystring');
var url = require('url');

// 连接数据库
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '1234',       
  port: '3306',                   
  database: 'QUOTE' 
}); 
 
connection.connect();

// 创建 http 服务器
const server = http.createServer((req, res) => {
	console.log(req)
	// 获取 http 请求中的查询参数
	const httpQuery = url.parse(req.url).query
	// 将查询参数转化为对象
	const urlObj = querystring.parse(httpQuery)

	let sql = 'SELECT * FROM Paper'

	switch(urlObj.target) {
		case 'paper': sql = 'SELECT * FROM Paper'; break
		case 'other': sql = 'SELECT design AS 设计费, film AS 菲林, PS AS PS版, proof AS 打样费, color_ream AS 色令, machine AS 开机费, bookbinding AS 装订费 FROM OTHER_UNIT_PRICES'; break
	}
	 
	//查
	connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message)
	          return
	        }
	 
	        console.log('--------------------------SELECT----------------------------')
	        console.log(result);
	        console.log('------------------------------------------------------------\n\n')

	        const response = JSON.stringify(result)
		    // console.log('query result: ', response)
			res.write(response)
			res.end()
	})
})


server.listen(8080)