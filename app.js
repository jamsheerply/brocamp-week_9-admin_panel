const express=require("express")
const path=require("path")
var loginRouter = require('./routes/login-page');
var signupRouter = require('./routes/sign-up');
var homeRouter = require('./routes/home');
var logoutRouter = require('./routes/logout');
var adminRouter = require('./routes/admin-panel');
var addRouter = require('./routes/add-user');
var editRouter = require('./routes/edit-user');
var deleteRouter = require('./routes/delete-user');

const app=express()
// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())

// static file
app.use(express.static(path.join(__dirname, "public")));

app.use('/', loginRouter);
app.use('/sign-up', signupRouter);
app.use('/home', homeRouter);
app.use('/logout', logoutRouter);
app.use('/admin-panel', adminRouter);
app.use('/add-user', addRouter);
app.use('/edit-user', editRouter);
app.use('/delete-user', deleteRouter);

app.listen(4000,()=>{
  console.log("server started at http://localhost:4000/ ")
})