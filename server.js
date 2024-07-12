const express = require('express') // 引入 express
const app = express() // 实例一个 express 对象
const bodyParser = require('body-parser');

app.use(require('cors')()) // 解决跨域
//解决请求上限过大问题
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const mysql = require('mysql'); //调用 MySQL模块

// 创建连接
// var db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // 用户名
//   password: 'root', // 密码
//   database: 'vueadmin',// 数据库名
//   port: 3306   // 端口号
// })
var db2  = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'test_db',
  port:3306
})
// db.connect( (err) => {
//   if(err) throw err;
//   console.log('连接成功');
// })
db2.connect( (err) => {
  if(err) throw err;
  console.log('连接成功');
})
setInterval(function () {
  db2.query('SELECT 1');
}, 5000);

//拦截路由返回
app.get('/', (req, res) => {
    res.send('小小章鱼')
  })

// 获取文章列表
// app.get('/api/article', (req, res) => {
//     let sql = "SELECT * FROM posts";
//     db.query(sql, (err, result) => {
//       if(err) {
//         console.log(err);
//         res.send("error")
//       } else {
//         console.log(result);
//         res.json({
//           code: 20000,
//           data: result
//         })
//       }
//     })
//   })
  
  // 新增文章
// app.post('/api/article', (req, res) => {
//   let data = req.body;
//   let sql = "INSERT INTO posts SET ?";
//   db.query(sql, data, (err, result) => {
//     if(err) {
//       console.log(err);
//       res.send("error")
//     } else {
//       console.log(result);
//       res.json({
//         code: 20000,
//         data: result
//       })
//     }
//   })
// })

// 删除文章
// app.delete('/api/article/:id', (req, res) => {
//     let sql = `DELETE FROM posts WHERE id= ${req.params.id}`;
//     db.query(sql, (err, result) => {
//       if(err) {
//         console.log(err);
//         res.send("error")
//       } else {
//         console.log(result);
//         res.json({
//           code: 20000,
//           data: result
//         })
//       }
//     })
//   })

  // 修改文章
// app.put('/api/article/:id', (req, res) => {
//     let newTitle = req.body.title;
//     let newBody = req.body.body;
//     let sql = `UPDATE posts SET title = '${newTitle}',body = '${newBody}' WHERE ID = ${req.params.id}`
//     db.query(sql, (err, result) => {
//       if(err) {
//         console.log(err);
//         res.send("error")
//       } else {
//         res.json({
//           code: 20000,
//           data: result
//         })
//       }
//     })
//   })

// 获取文章列表中的标题(模糊查询)
// app.get('/api/article/title/:title', (req, res) => {
//     let sql = "SELECT * FROM posts WHERE title like '%"+ req.params.title+"%'";
//     db.query(sql, (err, result) => {
//       if(err) {
//         console.log(err);
//         res.send("error")
//       } else {
//         console.log(result);
//         res.json({
//           code: 20000,
//           data: result
//         })
//       }
//     })
//   })

// 增加图片
app.post('/api/picture/addProduct', (req,res) => {
  console.log("收到");
  let data = req.body;
  console.log(data);
  let sql = "INSERT INTO newpicture SET ?";
  
  db2.query(sql, data, (err, result) => {
    if(err) { 
      console.log(err);
      res.send("error")
    } else {
      console.log(result);
      res.json({
        code: 20000,
        data: result
      })
    }
  })
})
app.post('/api/picture/addProductNew', (req,res) => {
  console.log("收到");
  let data = req.body;
  console.log(data);
  let sql = "INSERT INTO detailpicture SET ?";
  
  db2.query(sql, data, (err, result) => {
    if(err) { 
      console.log(err);
      res.send("error")
    } else {
      console.log(result);
      res.json({
        code: 20000,
        data: result
      })
    }
  })
})


// 增加标签
app.post('/api/picture/addlabel', (req,res) => {
  console.log("收到");
  let data = req.body;
  console.log(data);
  let sql = "INSERT INTO label SET ?";
  
  db2.query(sql, data, (err, result) => {
    if(err) { 
      console.log(err);
      res.send("error")
    } else {
      console.log(result);
      res.json({
        code: 20000,
        data: result
      })
    }
  })
})
// 查询图片
app.post('/api/picture', (req, res) => {
    let tags = req.body.tags;
    console.log(tags);
    
    // let tags1 = ["手机","电脑"];
    let leng = tags.length;
    let sql = `SELECT pic.*, lbl.* 
    FROM newpicture AS pic
    INNER JOIN label AS lbl ON pic.pictureuuid = lbl.pictureid where lbl.labelname IN ${tags} GROUP BY lbl.pictureid HAVING COUNT(DISTINCT lbl.labelname) = ${leng};`;
    console.log(sql)
    
    db2.query(sql, (err, result) => {
      if(err) {
        console.log(err);
        res.send("error")
      } else {
        console.log(result);
        res.json({
          code: 20000,
          data: result
        })
      }
    })
  })


  // 没有tags 搜索图片
  app.post('/api/searchPictureNotags', (req, res) => {
    console.log(req.body)



    let baseQuery = 'SELECT * FROM detailpicture WHERE';
    const condition = req.body;
    const keys = Object.keys(condition);
    const values = [];

    keys.forEach((key,index) =>{
      baseQuery += ` ${key} = ?`;
      values.push(condition[key]);
      if (index <keys.length - 1) baseQuery += ' AND ';
    });
    db2.query(baseQuery,values,(err,result) =>{

      if(err) {
        console.log(err);
        res.send("error")
      } else {
        console.log(result);
        res.json({
          code: 20000,
          data: result
        })
      }
    })
      
    })

    // 有tags 搜索图片
    app.post('/api/searchPictureWithtags', (req, res) => {
     
      let tags = req.body.tags;
      let leng = tags.length;
      console.log(req.body)
      const values = [];
      const tagsFormatted = tags.map(tag => `'${tag}'`).join(", ");
      let baseQuery = `SELECT pic.*,  GROUP_CONCAT(lbl.labelname ORDER BY lbl.labelname SEPARATOR ', ') AS aggregated_labelnames  FROM detailpicture AS pic INNER JOIN label AS lbl ON pic.pictureuuid = lbl.pictureid where lbl.labelname IN (${tagsFormatted}) GROUP BY lbl.pictureid HAVING COUNT(DISTINCT lbl.labelname) = ${leng} `;
      delete req.body.tags;
      if (req.body && Object.keys(req.body).length > 0) {
        baseQuery +=" AND "

        const condition = req.body;
      
        const keys = Object.keys(condition);
        
    
        keys.forEach((key,index) =>{
          baseQuery += ` pic.${key} = ?`;
          values.push(condition[key]);
          if (index <keys.length - 1) baseQuery += ' AND ';
        });

      }


  
      
      
      db2.query(baseQuery,values,(err,result) =>{
  
        if(err) {
          console.log(err);
          res.send("error")
        } else {
          console.log(result);
          res.json({
            code: 20000,
            data: result
          })
        }
      })
        
      })


      app.post('/api/searchPictureNotags', (req, res) => {
        // console.log(req.body)
        
    
    
        let baseQuery = 'SELECT * FROM detailpicture WHERE';
        const condition = req.body;
        const keys = Object.keys(condition);
        const values = [];
    
        keys.forEach((key,index) =>{
          baseQuery += ` ${key} = ?`;
          values.push(condition[key]);
          if (index <keys.length - 1) baseQuery += ' AND ';
        });
        db2.query(baseQuery,values,(err,result) =>{
    
          if(err) {
            console.log(err);
            res.send("error")
          } else {
            console.log(result);
            res.json({
              code: 20000,
              data: result
            })
          }
        })
          
        })
     
   



// 监听端口30001
app.listen(3001, () => {
  console.log('http://localhost:3001/')
})
