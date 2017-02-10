var express = require('express');
var router = express.Router();
var sql=require("mysql");
//var app1=require("./app.js");
// require('express-debug')(app, {/* settings */});
// var debug=require("express-debug");
// var apt=express();
// apt.set(debug());
 
var connection = sql.createConnection(
    {
         host:"localhost",
        user: "root",
         password:"venkat",
       database:"bala"
   }
 )
/* GET home page. */
// module.exports = function(app){

// }
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render("index");
});


/*app.get("/",function (req,res)
{
 var error= new Error("tried to handle error");
 next(err);
});
app.use(function(err,req,res,next)
{
    console.error(err.stack);
    res.send("something went wrong");

});*/




router.post("/login",function(req,res,next){
connection.query("select * from registration",function(err,rows)
{
  var count = 0;
  console.log(rows);
  for(x in rows)
  {
     if(req.body.name == rows[x].name && req.body.password ==rows[x].password )
     {
      res.render ("login");
    
      break;
      }
     else{
       console.log("invalid user");
      count++;
       }
    if(count==rows.length){
     res.send("Invalid credentials");  
     }
  }//end for
} );//end connection query
});//end router.post

    
  //     console.log(rows);
     
  //    res.send("new user added sucessfully");)

  //res.render('login');
router.get("/register",function(req,res){
  res.render("register");
 // res.end();
});
router.get("/signup",function(req,res){
 // console.log("post called");
  var user2= req.query.uname;
  console.log(user2);
  //connection.query("select * from registration",function(err,rows)
  connection.query("select * from registration",function(err,rows){
    console.log("hi");
    console.log(rows[0].name);
    var count1=0;
    for(x in rows){
      if(user2 == rows[x].name){
       // res.writeHead(200);
         res.send("user already existed");
          res.end();
        console.log("already registreed");
      
      //res.render("unsuceessfull");
      }//end if
      else
      count1++;
    }//end for
  if(count1==rows.length)
  {
    console.log(req.query.password);
  connection.query("insert into registration(name,password) values ('"+req.query.uname+"','"+req.query.password+"')",function(err,rows)
   {
 console.log(rows);
 res.render('signup');
});//end connection query insert
 
  }//end if

});//end connection query select
  //res.end();
  
});
module.exports = router;
