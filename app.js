var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');

var router_account = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'Express',
  cookie: { maxAge: 2 * 60 * 60 * 1000 },
  resave: true,
  rolling: true,
  saveUninitialized: true
}));

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ limit: '1024mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST"
  });
  next();
});

app.use(function (req, res, next) {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, oa-auth-token",
      "Access-Control-Allow-Credentials": 'true'
  });
  next();
});

app.use('/api/account', router_account);

app.get('/', (req, res) => {
    var html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8');
    res.send(html);
});

app.get('*', (req, res) => {
    res.send('<h1>Page Not Found</h1>');
});

module.exports = app;
