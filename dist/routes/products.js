"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../models/Product");
const productValidation_1 = require("../validations/productValidation");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const check_auth_1 = require("../middlewares/check-auth");
const router = express_1.Router();
exports.router = router;
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product_1.Product.findById(id)
        .exec()
        .then(doc => {
        if (doc) {
            res.status(200).send(doc);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
router.get('/', (req, res) => {
    Product_1.Product.find()
        .exec()
        .then(docs => {
        res.status(200).send(docs);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.post('/', check_auth_1.checkAuth, (req, res, next) => {
    if (res.locals.userData.type !== 'admin') {
        return res.sendStatus(401);
    }
    const { error, value } = joi_1.default.validate(req.body, productValidation_1.newProductSchema);
    if (error) {
        return next(error);
    }
    const product = new Product_1.Product({
        _id: new mongoose_1.default.Types.ObjectId(),
        categoryId: req.body.categoryId,
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    });
    product.save()
        .then(result => {
        res.status(201).send(result);
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
router.put('/:id', check_auth_1.checkAuth, (req, res, next) => {
    if (res.locals.userData.type !== 'admin') {
        return res.sendStatus(401);
    }
    const id = req.params.id;
    const { error, value } = joi_1.default.validate(req.body, productValidation_1.updateProductSchema);
    if (error) {
        next(error);
    }
    Product_1.Product.update({ _id: id }, {
        $set: {
            categoryId: req.body.categoryId,
            imgUrl: req.body.imgUrl,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        }
    })
        .exec()
        .then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.delete('/:id', check_auth_1.checkAuth, (req, res, next) => {
    if (res.locals.userData.type !== 'admin') {
        return res.sendStatus(401);
    }
    const id = req.params.id;
    Product_1.Product.remove({ _id: id }).exec()
        .then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
//# sourceMappingURL=products.js.map