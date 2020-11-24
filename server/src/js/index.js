"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
const handle_1 = require("./handle");
const app = express_1.default();
app.use((req, res) => {
    res.send('Hello World');
});
app.use(express_1.default.static('/public'));
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: 'chickenisgood',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    next();
});
typeorm_1.createConnection()
    .then((connection) => {
    handle_1.Handle.dbConnection = connection;
    console.log("데이터 베이스 연결 성공");
    app.listen(3000, () => {
        console.log('LISTENING SUCCESS');
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map