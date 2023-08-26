const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../../config");

const User = require('../../../Models/User');

function showLoginForm(req, res) {
    const flashMessages = req.flash();
    console.log(flashMessages)

    res.render('auth/login', {
        title: 'Login',
        flashMessages
    });
}

async function login(req, res) {

    const {username, password} = req.body;

    let field = 'username';

    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    if (regexExp.test(username)) {
        field = 'email';
    } else if (username.length > 10) {
        field = 'phone';
    }

    const user = await User.findOne({
        where: {[field]: req.body.username},
    });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const userObject = {
                ...(user.email !== null) && {email: user.email},
                first_name: user.first_name,
                id: user.id,
                ...(user.last_name !== null) && {last_name: user.last_name},
                ...(user.phone !== null) && {phone: user.phone},
            };

            const accessToken = jwt.sign({user: userObject}, config.jwt.secret, {
                algorithm: config.jwt.alg,
                audience: userObject.first_name,
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

            res.redirect('/login');
        }
    } else {
        req.flash('errorMessage', 'These credentials do not match our records.');

        res.redirect('/login');
    }
}

module.exports = {showLoginForm, login};
