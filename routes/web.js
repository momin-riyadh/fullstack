var express = require('express');
var router = express.Router();

const AuthMiddleware = require('../app/Http/Middleware/AuthMiddleware');
const HomeController = require('../app/Http/Controllers/HomeController');

/* GET home page. */
router.get('/', AuthMiddleware, HomeController);

module.exports = router;
