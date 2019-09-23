"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_1 = require("../validations/userValidation");
const joi_1 = __importDefault(require("joi"));
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const router = express_1.Router();
exports.router = router;
router.post('/signup', (req, res, next) => {
    const { error, value } = joi_1.default.validate(req.body, userValidation_1.newUserSchema);
    if (error) {
        return next(error);
    }
    User_1.User.findOne({ username: req.body.username }).exec()
        .then(doc => {
        if (doc) {
            res.sendStatus(409);
            return;
        }
        else {
            bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.sendStatus(500);
                    return;
                }
                else {
                    const user = new User_1.User({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        username: req.body.username,
                        password: hash,
                        type: 'user'
                    });
                    user.save()
                        .then(result => {
                        res.status(201).send(result);
                        return;
                    })
                        .catch(err => {
                        res.sendStatus(500);
                        return;
                    });
                }
            });
        }
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
router.post('/login', (req, res, next) => {
    User_1.User.findOne({ username: req.body.username }).exec()
        .then(user => {
        if (user) {
            bcrypt_1.default.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.sendStatus(401);
                    return;
                }
                if (result) {
                    if (process.env.JWT_KEY !== undefined) {
                        const token = jsonwebtoken_1.default.sign({
                            username: user.username,
                            userId: user._id,
                            type: user.type
                        }, process.env.JWT_KEY);
                        res.status(200).send({
                            message: "Auth successful",
                            token: token,
                            type: user.type
                        });
                        return;
                    }
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(401);
                return;
            });
        }
        else {
            res.sendStatus(401);
        }
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
router.delete('/:id', (req, res, next) => {
    User_1.User.remove({ _id: req.params.id }).exec()
        .then(result => {
        res.sendStatus(200);
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
//# sourceMappingURL=users.js.map