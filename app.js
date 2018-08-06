var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 整站配置
var config = require('./config'), render;
switch (config.engine){
  case 'ejs': render = require('ejs').renderFile; break;
  case 'swig': render = require('swig').renderFile; break;
  case 'handlebars': render = require('consolidate').handlebars; break;
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
if (config.engine == '' || config.engine == 'jade') {
  app.set('view engine', 'jade');
} else {
  app.engine('html', render);
  app.set("view engine", "html");
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = config.routes;
for (var i = 0; i < routes.length; i++) {
  app.use(routes[i].path, require('./routes/' + routes[i].file));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
