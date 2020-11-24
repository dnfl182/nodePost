"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("../entity/account");
const handle_1 = require("../handle");
const message_1 = require("../routerHelper/message");
const routerTemplate_1 = require("../routerHelper/routerTemplate");
const router = express_1.default.Router();
router.route('/login')
    .post(routerTemplate_1.RouterTemplate.create({
    validations: [
        {
            name: 'username',
            type: 'string',
            regex: /[\d|\w]{1,100}/
        },
        {
            name: 'password',
            type: 'string',
            regex: /[\w|\d]{128}/
        },
    ],
    hook: async (req, res, message) => {
        const username = req.body.username;
        const password = req.body.password;
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        try {
            const account = await accountRepo.findOne({ username: username, password: password });
            req.session.userid = account.id;
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
        }
    }
}));
router.route('') //create
    .put(routerTemplate_1.RouterTemplate.create({
    validations: [
        {
            name: 'username',
            type: 'string',
            regex: /[\d|\w]{1,100}/
        },
        {
            name: 'password',
            type: 'string',
            regex: /[\w|\d]{128}/
        },
    ],
    hook: async (req, res, message) => {
        const username = req.body.username;
        const password = req.body.password;
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        try {
            const account = await accountRepo.findOne({ username: username });
            message.code = 1; // 같은 아이디 이미 존재
            return;
        }
        catch (err) {
        }
        try {
            const account = await accountRepo.create({ username: username, password: password });
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
            return;
        }
    }
}));
router.route('/logout')
    .post(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        req.session.userid = undefined;
    }
}));
router.route('/checkUsername')
    .post(routerTemplate_1.RouterTemplate.create({
    validations: [
        {
            name: 'username',
            type: 'string',
            regex: /[\d|\w]{1,100}/
        }
    ],
    hook: async (req, res, message) => {
        const username = req.body.username;
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        try {
            await accountRepo.findOne({ username: username }); // 오류안나면 존재한다는뜻
            message.data = true;
        }
        catch (err) {
            message.data = false;
        }
    }
}));
exports.default = router;
//# sourceMappingURL=accounsRouter.js.map