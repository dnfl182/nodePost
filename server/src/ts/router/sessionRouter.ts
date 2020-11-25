import express from 'express';
import validator from 'validator';
import { Account } from '../entity/account';
import { Handle } from '../handle';
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
const router = express.Router();

    // 로그인 회원가입시 RSA 공개 개인키 방식 ㄱ
router.route('/')
    .put(RouterTemplate.create({
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
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const username = req.body.username;
            const password = req.body.password;
            const accountRepo = Handle.dbConnection.getRepository(Account);
            try {
                const account = await accountRepo.findOne({username: username, password: password});
                req.session.accountId = account.id;
            } catch (err) {
                message.code = Message.DefaultCode.ACTION_FAIL;
            }
        }
    }))
    .delete(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            req.session.accountId = undefined;
        }
    }))
    .get(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            if(req.session.accountId === undefined) {
                message.code = Message.DefaultCode.NOT_FOUND;
            } else {
                message.data = req.session.accountId;
            }
        }
    }));

router.route('/isLogined')
    .post(RouterTemplate.create({
    hook: async (req: express.Request, res: express.Response, message: Message) => {
        if(req.session.accountId) {
            message.data = true;
        } else {
            message.data = false;
        }
    }
}));
export default router;