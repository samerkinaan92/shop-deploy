"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const products_1 = require("./routes/products");
const categories_1 = require("./routes/categories");
const users_1 = require("./routes/users");
const carts_1 = require("./routes/carts");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const app = express_1.default();
exports.app = app;
mongoose_1.default.connect(`mongodb+srv://Samer:${process.env.MONGO_ATLAS_PW}@angilar-shop-lms3g.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => console.log(error));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/dist/myshop')));
app.use('/api/products', products_1.router);
app.use('/api/categories', categories_1.router);
app.use('/users', users_1.router);
app.use('/api/carts', carts_1.router);
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '../frontend/dist/myshop/index.html')));
//# sourceMappingURL=app.js.map