var express = require('express');
var router = express.Router();

const GuestMiddleware = require('../app/Http/Middleware/GuestMiddleware');
const LoginRequest = require('../app/Http/Requests/LoginRequest');
const LoginController = require('../app/Http/Controllers/Auth/LoginController');

/* GET login page. */
router.get('/login', GuestMiddleware, LoginController.showLoginForm);

/* POST login. */
router.post('/login', GuestMiddleware, LoginRequest.validate, LoginController.login);

module.exports = router;