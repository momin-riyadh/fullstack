var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const config = require('./config');
const flash = require('connect-flash');

var webRouter = require('./routes/web');
var authRouter = require('./routes/auth');

var app = express();

const fileStoreOptions = {
    path: path.join(__dirname, 'sessions'), // Use a separate directory for session storage
};
app.use(session({
    // store: new FileStore(fileStoreOptions),
    secret: config.app.key,
    saveUninitialized: true,
    resave: false
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
