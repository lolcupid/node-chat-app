var moment = require('moment');

var generateMsg = function (from, text) {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

var generateLocationMsg = function (from, latitude, longitude) {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
};

module.exports = {generateMsg, generateLocationMsg};