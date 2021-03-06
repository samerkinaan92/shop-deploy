"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.newProductSchema = joi_1.default.object({
    _id: joi_1.default.equal(null),
    categoryId: joi_1.default.string().required(),
    imgUrl: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    price: joi_1.default.number().min(0.01).required(),
    description: joi_1.default.string().allow('')
});
exports.updateProductSchema = joi_1.default.object({
    _id: joi_1.default.string().length(24).required(),
    categoryId: joi_1.default.string().required(),
    imgUrl: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    price: joi_1.default.number().greater(0).required(),
    description: joi_1.default.string().allow('')
});
//# sourceMappingURL=productValidation.js.map