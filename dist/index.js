"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const port = process.env.PORT || 8080;
const server = app_1.app.listen(port, () => {
    console.log(' App is running at http://localhost:%d in %s mode', port, app_1.app.get('env'));
    console.log(' Press CTRL-C to stop\n');
});
//# sourceMappingURL=index.js.map