const AuthService = require('../../../Services/AuthService')

function showLoginForm(req, res){
    const flashMessages = req.flash();

    res.render('auth/login', {
        title: 'Login',
        flashMessages
    });
}

async function login(req, res){
    const user = await AuthService.login(req, res);

    // Check if the user is authenticated (user exists)
    if (user && typeof user.access_token !== 'undefined') {
        // Redirect to the home page
        req.session.accessToken = user.access_token;

        res.redirect('/');
    } else {
        // Redirect to the login page
        res.redirect('/login');
    }
}

module.exports = {showLoginForm, login};