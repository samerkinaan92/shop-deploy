"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
function checkAuth(req, res, next) {
    if (process.env.JWT_KEY !== undefined && req.headers.authorization !== undefined) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            res.locals.userData = decoded;
            next();
        }
        catch (err) {
            res.sendStatus(401);
            return;
        }
    }
    else {
        res.sendStatus(500);
        return;
    }
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=check-auth.js.map