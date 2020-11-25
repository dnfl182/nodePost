import express from 'express';
import validator from 'validator';
import { Account } from '../entity/account';
import { Handle } from '../handle';
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
const router = express.Router();

router.route('')    //create
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
                const account = await accountRepo.findOne({username: username});
                if(account !== undefined) {
                    message.code = 1; 
                    return;
                } 
            } catch (err) {
            }
            try { 
                const account = await accountRepo.create({username: username, password: password});
                accountRepo.save(account);
            } catch (err) {
                message.code = Message.DefaultCode.ACTION_FAIL;
                return;
            }
        }
    }));

router.route('/isExistUsername') 
    .post(RouterTemplate.create({
        validations: [
            {
                name: 'username',
                type: 'string',
                regex: /[\d|\w]{1,100}/
            }
        ],
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const username = req.body.username;
            const accountRepo = Handle.dbConnection.getRepository(Account);
            try {
                const account = await accountRepo.findOne({username: username});
                if(account === undefined) {
                    message.data = true;
                } else {
                    message.data = false;
                }
            } catch (err) {
                console.log(err);
                message.code = Message.DefaultCode.ACTION_FAIL;
                return;
            }
        }
    }));

router.route('/:accountId')
    .get(RouterTemplate.create({
    hook: async (req: express.Request, res: express.Response, message: Message) => {
        if(!validator.isNumeric(req.params.accountId)) {
            message.code = Message.DefaultCode.VALIDATION_ERROR;
            return;
        }
        const accountId = Number(req.params.accountId);
        const accountRepo = Handle.dbConnection.getRepository(Account);
       
        try {
            const account = await accountRepo.findOne({id: accountId});
            if(req.session.accountId == accountId) {    // 로그인되어있을경우와 아닐경우 분리
                message.data = {
                    ...account
                }
            } else {
                message.data = {
                    accountId: account.id,
                    username: account.username
                }
            }
        } catch (err) {
            message.data = false;
        }
    }
}));
export default router;