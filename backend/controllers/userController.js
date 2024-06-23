const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJWTtoken = (user) => {
    return jwt.sign(
        { username: user.username }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

class UserController {
    async registration(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(ApiError.badRequest('Вы не ввели username либо password'));
        }

        try {
            const people = await User.findOne({ where: {username}});
            if (people) {
                return next(ApiError.userAlreadyExists('Такой пользователь уже существует'));
            }
            const hashPassword = await bcrypt.hash(password, 5);
            await User.create({username, password: hashPassword});
            return res.status(200).json({message: 'Успешная регистрация'});
        } catch(e) {
            return next(ApiError.internal('Что-то пошло не так, попробуйте еще раз'));
        }
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({where: {username}});
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return next(ApiError.badRequest('Указан неверный пароль'));
            }
            
            const JWTtoken = generateJWTtoken(user);

            return res.status(200).json({message: 'Успешная авторизация', JWTtoken});
        } catch(e) {
            return next(ApiError.internal('Что-то пошло не так, попробуйте еще раз'));
        }
    }

    async check(req, res) {
        const JWTtoken = generateJWT(req.user.username);
        return res.json({JWTtoken});
     }
};

module.exports = new UserController();