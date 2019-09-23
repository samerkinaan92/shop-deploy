"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const categorySchema = new Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    title: { type: String, required: true }
});
const Category = mongoose_1.default.model('Category', categorySchema);
exports.Category = Category;
//# sourceMappingURL=Category.js.map