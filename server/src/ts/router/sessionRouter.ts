import express from 'express';
import { Account } from '../entity/account';
import { Handle } from '../handle';
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
import forge from 'node-forge'
const router = express.Router();

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
                //regex: /[\w|\d]{1,128}/
            },
        ],
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            if(!req.session.publicKey) {
                message.code = Message.DefaultCode.KEY_NOT_FOUND;
                return;
            }
            const username = req.body.username;
            const password = req.body.password;
            const accountRepo = Handle.dbConnection.getRepository(Account);

            let privateKey, decryptedPassword, hashedPassword;
            try { 
                privateKey = forge.pki.privateKeyFromPem(req.session.privateKey);
                decryptedPassword = privateKey.decrypt(password);
                hashedPassword = forge.md.sha512.create().update(decryptedPassword).digest().toHex();
            } catch (err) {
                message.code = Message.DefaultCode.VALIDATION_ERROR;
                return;
            }
            try {
                const account = await accountRepo.findOne({username: username, password: hashedPassword});
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