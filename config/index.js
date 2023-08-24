const fs = require('fs');
const path = require('path');

const config = {};

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js') // Exclude index.js itself
    .forEach(file => {
        const moduleName = path.parse(file).name;
        const modulePath = path.join(__dirname, file);
        config[moduleName] = require(modulePath);
    });

module.exports = config;