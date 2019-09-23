"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    cart: [{
            productId: Schema.Types.ObjectId,
            quantity: Number,
            _id: false
        }]
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
//# sourceMappingURL=User.js.map