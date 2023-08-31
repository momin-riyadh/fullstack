const toArray = (user) => {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        full_name: user.getFullName(),
    };
};

module.exports = toArray;