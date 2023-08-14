var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const config = require('../config')
const connection = mysql.createConnection(config.database);

var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.redirect('/login');
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('auth/login', {
        title: 'Login'
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

    const query = 'select `id`, `email`, `mobile`, `password` from users where `' + field + '` = \'' + req.body.username + '\' limit 1;';

    connection.query(query, async (err, users, fields) => {
        if (users.length) {
            //const passwordMatch = await bcrypt.compare(req.body.password, users[0].password);
            //console.log(passwordMatch)
            if (await bcrypt.compare(req.body.password, users[0].password)) {
                res.json({message: 'Login successful'});
            } else {
                res.status(401).json({message: 'Invalid username or password'});
            }
        }
        //console.log(results.length); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
    });
});

module.exports = router;
