const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');

class Authentication {
    isAuthenticated(req, res, next) {
        let token = req.headers['authorization'];
        if (token) {
            token = token.split(' ').length > 1 ? token.split(' ')[1] : token;
            token = token.replace(/['"]+/g, '');
        }

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.SIGNIN_SECRET, function(err, decoded) {
                if (err) {
                    return res.status(403).json({ message: 'Unauthorized access.' });
                } else {

                    userService.get(`email='${decoded.email}'`).then((response) => {
                        req.decoded = decoded;
                        next(); //if token is valid and available in the DB
                    }).catch((err) => {
                        return res.status(403).json({ message: "Token is invalid" });
                    });
                }
            });
        } else {
            return res.status(403).json({ message: 'Token not provided.' });
        }
    }

    generateToken(data) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, process.env.SIGNIN_SECRET, (err, token) => {
                if (err)
                    reject(err);
                else
                    resolve(token);
            });
        });
    }

    generateHash(rawPassword) {
        return bcrypt.hashSync(rawPassword, 10);
    }

    comparePassword(rawPassword, hash) {
        return bcrypt.compareSync(rawPassword, hash);
    }
}

module.exports = new Authentication();