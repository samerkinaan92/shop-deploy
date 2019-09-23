"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_auth_1 = require("../middlewares/check-auth");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const cartValidation_1 = require("../validations/cartValidation");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.Router();
exports.router = router;
router.get('/:username', check_auth_1.checkAuth, (req, res, next) => {
    const username = req.params.username;
    if (res.locals.userData.username !== username) {
        return res.sendStatus(401);
    }
    User_1.User.findOne({ username })
        .select('cart')
        .exec()
        .then(doc => {
        const ids = doc.cart.map(cartItem => mongoose_1.default.Types.ObjectId(cartItem.productId));
        Product_1.Product.find({
            '_id': { $in: ids }
        })
            .select('_id categoryId imgUrl title price description')
            .exec()
            .then(docs => {
            res.status(200).send(docs);
        });
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.post('/:username', check_auth_1.checkAuth, (req, res, next) => {
    const username = req.params.username;
    if (res.locals.userData.username !== username) {
        return res.sendStatus(401);
    }
    const { error, value } = joi_1.default.validate(req.body, cartValidation_1.newCartSchema);
    if (error) {
        return next(error);
    }
    Product_1.Product.findById(req.body.productId).exec()
        .then(doc => {
        if (doc) {
            console.log(req.body);
            User_1.User.updateOne({ username }, { $push: { cart: req.body } }).exec()
                .then(result => {
                return res.status(201).send(result);
            })
                .catch(err => {
                return res.status(500).send(err);
            });
        }
        else {
            return res.status(404).send({
                message: 'product id does not exist'
            });
        }
    })
        .catch(err => {
        return res.status(500).send(err);
    });
});
router.patch('/:username', check_auth_1.checkAuth, (req, res, next) => {
    const username = req.params.username;
    if (res.locals.userData.username !== username) {
        return res.sendStatus(401);
    }
    const { error, value } = joi_1.default.validate(req.body, cartValidation_1.newCartSchema);
    if (error) {
        return next(error);
    }
    User_1.User.updateOne({ username, 'cart.productId': req.body.productId }, {
        '$set': { 'cart.$.quantity': req.body.quantity }
    })
        .exec()
        .then(doc => {
        res.status(200).send(doc);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.delete('/:username.:productId', check_auth_1.checkAuth, (req, res, next) => {
    const username = req.params.username;
    if (res.locals.userData.username !== username) {
        return res.sendStatus(401);
    }
    const productId = req.params.productId;
    User_1.User.updateOne({ username }, {
        $pull: {
            cart: { productId }
        }
    })
        .exec()
        .then(doc => {
        res.status(200).send(doc);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
//# sourceMappingURL=carts.js.map