var express = require('express');
var router = express.Router();
var app = express();
var cookieParser = require('cookie-parser');
/* GET users listing. */


app.use(cookieParser());


module.exports = router;
