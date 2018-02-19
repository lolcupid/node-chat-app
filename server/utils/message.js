var generateMsg = function (from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

var generateLocationMsg = function (from, latitude, longitude) {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
};

module.exports = {generateMsg, generateLocationMsg};