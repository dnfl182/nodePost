"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const app = express_1.default();
app.use((req, res) => {
    res.send('Hello World');
});
typeorm_1.createConnection()
    .then((connection) => {
    console.log("데이터 베이스 연결 성공");
    app.listen(3000, () => {
        console.log('LISTENING SUCCESS');
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map