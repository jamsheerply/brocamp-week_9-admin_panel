//express
const express=require("express")
const app=express()
app.listen(4000,()=>{
  console.log("server started at http://127.0.0.1:4000/ ")
})



// view engine
app.set('views',"./views")
app.set('view engine', 'ejs')

// bodyParser
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// static file
app.use(express.static("public"));

// mongodb
const mogoose=require("mongoose")
mogoose.connect("mongodb://127.0.0.1:27017/admin_pannel")

var loginRouter = require('./routes/login-page');
app.use('/', loginRouter);

var signupRouter = require('./routes/sign-up');
app.use('/sign-up', signupRouter);

var homeRouter = require('./routes/home');
app.use('/home', homeRouter);

var logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);

var adminRouter = require('./routes/admin-panel');
app.use('/admin-panel', adminRouter);

var addRouter = require('./routes/add-user');
app.use('/add-user', addRouter);

var editRouter = require('./routes/edit-user');
app.use('/edit-user', editRouter);

var deleteRouter = require('./routes/delete-user');
app.use('/delete-user', deleteRouter);