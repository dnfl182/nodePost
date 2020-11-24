"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const typeorm_1 = require("typeorm");
const handle_1 = require("./handle");
const path_1 = __importDefault(require("path"));
const accounsRouter_1 = __importDefault(require("./router/accounsRouter"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../public')));
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: 'chickenisgood',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    console.log('바디', req.body, req.params, req.query);
    next();
});
app.use('/accounts', accounsRouter_1.default);
app.use((req, res, next) => {
    if (req.method === "GET") {
        res.type("html");
        res.sendFile(path_1.default.resolve(__dirname, '../../public/spa.html'));
    }
    else {
        next();
    }
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