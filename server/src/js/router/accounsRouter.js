"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("validator"));
const account_1 = require("../entity/account");
const handle_1 = require("../handle");
const message_1 = require("../routerHelper/message");
const routerTemplate_1 = require("../routerHelper/routerTemplate");
const router = express_1.default.Router();
// 로그인 회원가입시 RSA 공개 개인키 방식 ㄱ
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
            regex: /[\w|\d]{1,128}/
        },
    ],
    hook: async (req, res, message) => {
        const username = req.body.username;
        const password = req.body.password;
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        try {
            const account = await accountRepo.findOne({ username: username, password: password });
            req.session.accountId = account.id; // 세션 객체로 만들면 관리 좋음
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
            if (account !== undefined) {
                message.code = 1;
                return;
            }
        }
        catch (err) {
        }
        try {
            const account = await accountRepo.create({ username: username, password: password });
            accountRepo.save(account);
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
        req.session.accountId = undefined;
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
            const account = await accountRepo.findOne({ username: username });
            if (account === null) {
                message.data = true;
            }
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
            return;
        }
    }
}));
router.route('/:accountId')
    .get(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (!validator_1.default.isNumeric(req.params.accountId)) {
            message.code = message_1.Message.DefaultCode.VALIDATION_ERROR;
            return;
        }
        const accountId = Number(req.params.accountId);
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        try {
            const account = await accountRepo.findOne({ id: accountId });
            if (req.session.accountId == accountId) { // 로그인되어있을경우와 아닐경우 분리
                message.data = {
                    ...account
                };
            }
            else {
                message.data = {
                    accountId: account.id,
                    username: account.username
                };
            }
        }
        catch (err) {
            message.data = false;
        }
    }
}));
exports.default = router;
//# sourceMappingURL=accounsRouter.js.map