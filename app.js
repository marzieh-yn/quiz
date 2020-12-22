var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')
var session = require('express-session');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clucksRouter = require('./routes/clucks');

// const helmet = require('helmet');
// app.use(helmet());
var app = express();

app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
// app.use(expressValidator());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clucks', clucksRouter);


app.get("/login", (req, res) => {
  res.render("login", { model: {} });
});
const knex=require("./client");// connection database

app.use(cookieParser());

// Logout user
app.get('/logout', function (req, res) {
  res.clearCookie('username');
  // req.flash('success', 'Login Again Here');
  res.redirect('/login');
});
//basic route for homepage
app.get('/', (req, res)=>{
  res.send('welcome to express app');
});

//Route for adding cookie
app.post('/loginUser', (req, res, next) => {
  const { username } = req.body;
  // const username = req.body.username;
  res.cookie('username', username);
  console.log(username);
  knex("user")
      .insert({
        username: username,
        content: "null",
        image_url: "null"
      })
      .returning('username')
      .then(user=>{
        // To show the data that is saved in a db

        res.redirect(`/home_show/${username}`) // redirecting our server to display the show.ejs(Show page). Which we will be building now.
      })
})

//Iterate users data from cookie
app.get('/home_show/:username',(req, res, next) => {
  //response.send will pass string to the page
  // response.send(`welcome`);
  const id=req.params.id;
  //this will reder welcome page.ejs page inside /views
  res.render('home', {
    username: req.cookies.username,
    id:id
  });
  // console.log(response);
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});







app.use(cookieSession({
  name: 'session',
  keys: [/* secret keys */],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var PORT = 8080;

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res, next) {
  res.render('home.ejs');
})

app.listen(PORT, function(err){
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
module.exports = app;
