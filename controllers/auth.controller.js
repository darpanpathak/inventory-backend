const userService = require('../services/user.service');
const authentication = require('../helpers/authentication');

class AuthController {
    static get name() {
        return "auth";
    }

    get() {
        return new Promise((resolve, reject) => {
            resolve({ data: [], message: "done" });
        });
    }

    signup(req) {
        const body = req.body;
        const requiredKeys = ["fullName", "email", "password"];
        const validation = this.__validate(body, requiredKeys);
        if (validation.status) {

            return userService.count(`email = '${body.email}'`)
                .then((resp) => {
                    if (resp[0].count > 0) {
                        throw new Error("User already exists");
                    } else {
                        const password = authentication.generateHash(body.password);
                        body.password = password;
                        return userService.create(body);
                    }
                })
                .then((resp) => {
                    return { message: "Signed up successfully", data: resp, status: 201 };
                })
                .catch((err) => {
                    return { message: err.message, status: 400 }
                });
        } else {
            return { message: validation.message, status: 400 };
        }
    }

    login(req) {
        const body = req.body;
        const requiredKeys = ["email", "password"];
        const validation = this.__validate(body, requiredKeys);

        if (validation.status) {

            return userService.get(`email = '${body.email}'`)
                .then((resp) => {
                    const user = { email: resp[0].email, id: resp[0].id, fullName: resp[0].fullName };
                    if (user.email) {
                        const isPasswordValid = authentication.comparePassword(body.password, resp[0].password);

                        if (isPasswordValid) {
                            return authentication.generateToken(user).then((resolve) => [user, resolve]);
                        } else {
                            throw new Error("Entered password is not valid");
                        }

                    } else {
                        throw new Error("User doesn't exists");
                    }
                })
                .then(([user, token]) => {
                    return { message: "logged in successfully", data: { user, token }, status: 200 };
                })
                .catch((err) => {
                    return { message: err.message, status: 400 }
                });
        } else {
            return { message: validation.message, status: 400 };
        }
    }

    // # Helpers #

    __validate(body, requiredKeys) {

        const isRequiredSuccess = requiredKeys.some(item => !body.item);

        if (!isRequiredSuccess) {
            return { status: false, message: "Required items are missing" };
        } else if (!this.__isEmailValid(body.email)) {
            return { status: false, message: "Email Id is not valid" };
        }

        return { status: true, message: "Everything is okey" };

    }

    __isEmailValid(email) {
        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!email)
            return false;

        if (email.length > 254)
            return false;

        var valid = emailRegex.test(email);
        if (!valid)
            return false;

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if (parts[0].length > 64)
            return false;

        var domainParts = parts[1].split(".");
        if (domainParts.some(function(part) { return part.length > 63; }))
            return false;

        return true;
    }
}

module.exports = new AuthController();