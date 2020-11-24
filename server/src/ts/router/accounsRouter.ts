import express from 'express';
import { Account } from '../entity/account';
import { Handle } from '../handle';
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
const router = express.Router();


router.route('/login')
    .post(RouterTemplate.create({
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
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const username = req.body.username;
            const password = req.body.password;
            const accountRepo = Handle.dbConnection.getRepository(Account);
            try {
                const account = await accountRepo.findOne({username: username, password: password});
                req.session.userid = account.id;
            } catch (err) {
                message.code = Message.DefaultCode.ACTION_FAIL;
            }
        }
    }));


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
                regex: /[\w|\d]{128}/
            },
        ],
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const username = req.body.username;
            const password = req.body.password;
            const accountRepo = Handle.dbConnection.getRepository(Account);
            try {
                const account = await accountRepo.findOne({username: username});
                message.code = 1;   // 같은 아이디 이미 존재
                return;
            } catch (err) {
                
            }
            try { 
                const account = await accountRepo.create({username: username, password: password});
            } catch (err) {
                message.code = Message.DefaultCode.ACTION_FAIL;
                return;
            }
        }
    }));

router.route('/logout')
    .post(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            req.session.userid = undefined;
        }
    }));


router.route('/checkUsername') 
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
                await accountRepo.findOne({username: username});    // 오류안나면 존재한다는뜻
                message.data = true;
            } catch (err) {
                message.data = false;
            }
        }
    }));
export default router;