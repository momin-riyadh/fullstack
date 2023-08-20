var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const config = require('../config')
const connection = mysql.createConnection(config.database);
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.redirect('/login');
});

/* GET login page. */
router.get('/login', function (req, res, next) {

    const flashMessages = req.flash();

    res.render('auth/login', {
        title: 'Login',
        flashMessages
    });
});

/* POST login. */
router.post('/login', function (req, res, next) {

    var field = 'username';

    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    if (regexExp.test(req.body.username)) {
        field = 'email';
    } else if (req.body.username.length > 10) {
        field = 'mobile';
    }

    const query = 'select `id`, `first_name`, `last_name`, `email`, `mobile`, `password` from users where `' + field + '` = \'' + req.body.username + '\' limit 1;';

    connection.query(query, async (err, users, fields) => {
        if (users.length) {
            if (await bcrypt.compare(req.body.password, users[0].password)) {

                const user = {
                    ...(users[0].email !== null) && {email: users[0].email},
                    first_name: users[0].first_name,
                    id: users[0].id,
                    ...(users[0].last_name !== null) && {last_name: users[0].last_name},
                    ...(users[0].mobile !== null) && {mobile: users[0].mobile},
                };

                const accessToken = jwt.sign({user: user}, config.jwt.secret, {
                    algorithm: config.jwt.alg,
                    audience: user.first_name,
                    expiresIn: config.jwt.expiresIn + 'd',
                    issuer: config.app.name,
                    subject: '',
                    header: {
                        alg: config.jwt.alg,
                        typ: config.jwt.typ,
                    },
                });

                req.session.accessToken = accessToken;

                res.redirect('/');
            } else {
                req.flash('errorMessage', 'The provided password is incorrect.');
                //req.locals.errorMessage = 'The provided password is incorrect.';
                res.redirect('/login');
            }
        }else {
            req.flash('errorMessage', 'These credentials do not match our records.');
            //req.locals.errorMessage = 'These credentials do not match our records.';
            res.redirect('/login');
        }
        //console.log(results.length); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
    });
});

module.exports = router;
