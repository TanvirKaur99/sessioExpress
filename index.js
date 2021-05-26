var express=require('express');
var bodyparser=require('body-parser');
var session=require('express-session');


var app=express();
app.use(session({secret:"afjakl",saveUninitialized:true,resave:true}))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/controllers/views/login.html");
});
//default path open


app.post("/loginData",(req,res)=>{
    req.session.user=req.body.username;
    console.log(req.body.username);
    res.redirect('/profile');
})
//html form and this path should be same and it will work on button action
//helps in getting values from values



//this the profile paths
app.get('/profile',(req,res)=>{
  if(req.session.user)
  {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("welcome" +req.session.user);
    res.write("<a href='" + "/logout"+"'>Logout</a>");
    res.end();

  }
  else{
  res.redirect('/');
  }


});

app.get('/logout',(req,res)=>{

    req.session.destroy();
    res.redirect('/');
})



app.listen(3200,(err)=>{
    if(err){
        console.log('error'+err)
    }
    else{
        "server is running on http://localhost:3000"
    }
});
