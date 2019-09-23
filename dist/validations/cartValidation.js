"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.newCartSchema = joi_1.default.object({
    productId: joi_1.default.string().length(24).required(),
    quantity: joi_1.default.number().greater(0).integer().required()
});
//# sourceMappingURL=cartValidation.js.map