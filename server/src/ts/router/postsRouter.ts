import express, { Router } from 'express'
import session from 'express-session';
import { createQueryBuilder } from 'typeorm';
import validator from 'validator';
import { Post } from '../entity/post';
import { Handle } from '../handle';
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
const router = express.Router();
router.route('/:postId')
    .get(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            if(!validator.isNumeric(req.params.postId)) {
                message.code = Message.DefaultCode.VALIDATION_ERROR;
                return;
            }
            const postId: number = Number(req.params.postId);
            try {
                const result = await createQueryBuilder('Post').where({id: postId}).select().innerJoinAndSelect("Post.account", "account").getOne();
                console.log(result);
                if(result === undefined) {
                    message.code = Message.DefaultCode.NOT_FOUND;
                    return;
                }
                message.data = {
                    id: result["id"],
                    title: result["title"],
                    content: result["content"],
                    username: result["account"]["username"],
                    accountId: result["account"]["id"]
                }
            } catch (err) {
                console.log(err);
                message.code = Message.DefaultCode.ACTION_FAIL;
            }
        }
    }))
    .delete(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            if(!validator.isNumeric(req.params.postId)) {
                message.code = Message.DefaultCode.VALIDATION_ERROR;
            }
            const postId: number = Number(req.params.postId);
            //나중에 role 만들어서 어드민 추가
            try {
                const result = await createQueryBuilder('Post').where({id: postId}).innerJoinAndSelect("Post.account", "account").getOne();
                if(result === undefined) {
                    message.code = Message.DefaultCode.NOT_FOUND;
                    return;
                }
                if(!(req.session.accountId && req.session.accountId === result["account"]["id"])) {
                    message.code = Message.DefaultCode.PERMISSION_ERROR;
                    return;
                } 
                await Handle.dbConnection.getRepository(Post).delete({
                    id: postId
                })
            } catch (err) {
                console.log(err);
                message.code = Message.DefaultCode.ACTION_FAIL;
            }
        }
    }));

router.route('/')
    .put(RouterTemplate.create({
        validations: [
            {
                name: 'title',
                type: 'string',
                regex: /[\s\S]{1,100}/
            },
            {
                name: 'content',
                type: 'string',
                regex: /[\s\S]{1,500}/
            },
        ],
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const title = req.body.title;
            const content = req.body.content;
            const postRepo = Handle.dbConnection.getRepository(Post);
            if(!req.session.accountId) {
                message.code = Message.DefaultCode.PERMISSION_ERROR;
                return;
            }
            try {
                const post = postRepo.create({
                    title: title,
                    content: content,
                    account: req.session.accountId
                });
                postRepo.save(post);
            } catch (err) {
                message.code = Message.DefaultCode.ACTION_FAIL;
            }
        }
    }));

router.route('/page/:page')
    .get(RouterTemplate.create({
        hook: async (req: express.Request, res: express.Response, message: Message) => {
            const ammountPerPage = 10;
            if(validator.isNumeric(req.params.page)) {
                const page = Number(req.params.page);
                try {
                    const result = await createQueryBuilder('post').orderBy('id', 'DESC')
                        .offset((page - 1) * ammountPerPage).limit(ammountPerPage).leftJoinAndSelect('Post.account', 'account').getMany();
                    const posts = [];
                    for(const post of result) {
                        posts.push({
                            username: post["account"]["username"],
                            title: post["account"],
                            content: post["content"],
                            id:  posts["id"]
                        })
                    }
                    message.data = posts;
                } catch (err) {
                    message.code = Message.DefaultCode.ACTION_FAIL;
                    return;
                }
            } else {
                if(req.params.page === "max") {
                    try { 
                        const postCount = await Handle.dbConnection.getRepository(Post).count();
                        message.data = Math.ceil(postCount / ammountPerPage);
                    } catch (err) {
                        message.code = Message.DefaultCode.ACTION_FAIL;
                        return;
                    }
                } else {
                    message.code = Message.DefaultCode.NOT_FOUND;
                    return;
                }
            }
            
        }
    }));

export default router;