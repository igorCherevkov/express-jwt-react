const ApiError = require('../error/ApiError');

module.exports = function(error, res) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'});
}