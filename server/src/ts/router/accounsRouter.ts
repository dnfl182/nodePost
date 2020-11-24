import express from 'express';
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
        }
    }));

router.route('')    //create
    .post();
router.route('/logout')
    .post((req: express.Request, res: express.Response, next: express.NextFunction) => {

    });


export default router;