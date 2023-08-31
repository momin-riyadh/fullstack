const SimpleUserResource = require('./Users/SimpleUserResource');

const toArray = (user, accessToken) => {
    return {
        user: SimpleUserResource(user),
        access_token: accessToken,
    };
};

module.exports = toArray;