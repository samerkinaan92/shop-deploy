"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_1 = require("../models/Category");
const categoryValidation_1 = require("../validations/categoryValidation");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const check_auth_1 = require("../middlewares/check-auth");
const router = express_1.Router();
exports.router = router;
router.get('/', (req, res) => {
    Category_1.Category.find()
        .exec()
        .then(docs => {
        res.status(200).send(docs);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
router.post('/', check_auth_1.checkAuth, (req, res, next) => {
    if (res.locals.userData.type !== 'Admin') {
        return res.sendStatus(401);
    }
    const { error, value } = joi_1.default.validate(req.body, categoryValidation_1.newCategorySchema);
    if (error) {
        return next(error);
    }
    const category = new Category_1.Category({
        _id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title
    });
    category.save()
        .then(result => {
        res.status(201).send(result);
    })
        .catch(err => {
        res.sendStatus(500);
    });
});
router.delete('/:id', check_auth_1.checkAuth, (req, res, next) => {
    if (res.locals.userData.type !== 'Admin') {
        return res.sendStatus(401);
    }
    const id = req.params.id;
    Category_1.Category.remove({ _id: id }).exec()
        .then(result => {
        res.status(200).send(result);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
//# sourceMappingURL=categories.js.map