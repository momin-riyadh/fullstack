var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const config = require('./config');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            req.user = user; // Attach user info to request
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.status(401).json({ message: 'Authentication token not provided' });
    }
};

// Guest middleware
const guestMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (! token) {
        next(); // Proceed to the next middleware or route handler
    } else {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                next(); // Proceed to the next middleware or route handler
            } else {
                res.redirect('/');
            }
        });
    }
};

var app = express();

app.use(session({
    secret: config.app.key,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * config.session.lifetime,
    //     secure: true
    // },
    resave: false
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
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

function auth(req, res, next){}

module.exports = app;
