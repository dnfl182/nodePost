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
const node_forge_1 = __importDefault(require("node-forge"));
const router = express_1.default.Router();
// 로그인 회원가입시 RSA 공개 개인키 방식 ㄱ
router.route('/')
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
        },
    ],
    hook: async (req, res, message) => {
        if (!req.session.publicKey) {
            message.code = message_1.Message.DefaultCode.KEY_NOT_FOUND;
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        const accountRepo = handle_1.Handle.dbConnection.getRepository(account_1.Account);
        let privateKey, decryptedPassword, hashedPassword;
        try {
            privateKey = node_forge_1.default.pki.privateKeyFromPem(req.session.privateKey);
            decryptedPassword = privateKey.decrypt(password);
            hashedPassword = node_forge_1.default.md.sha512.create().update(decryptedPassword).digest().toHex();
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.VALIDATION_ERROR;
            return;
        }
        try {
            const account = await accountRepo.findOne({ username: username, password: hashedPassword });
            req.session.accountId = account.id;
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
        }
    }
}))
    .delete(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        req.session.accountId = undefined;
    }
}))
    .get(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (req.session.accountId === undefined) {
            message.code = message_1.Message.DefaultCode.NOT_FOUND;
        }
        else {
            message.data = req.session.accountId;
        }
    }
}));
router.route('/isLogined')
    .post(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (req.session.accountId) {
            message.data = true;
        }
        else {
            message.data = false;
        }
    }
}));
exports.default = router;
//# sourceMappingURL=sessionRouter.js.map