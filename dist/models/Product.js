"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productSchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    categoryId: { type: String, required: true },
    imgUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
//# sourceMappingURL=Product.js.map