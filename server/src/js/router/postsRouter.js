"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const validator_1 = __importDefault(require("validator"));
const post_1 = require("../entity/post");
const handle_1 = require("../handle");
const message_1 = require("../routerHelper/message");
const routerTemplate_1 = require("../routerHelper/routerTemplate");
const router = express_1.default.Router();
router.route('/:postId')
    .get(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (!validator_1.default.isNumeric(req.params.postId)) {
            message.code = message_1.Message.DefaultCode.VALIDATION_ERROR;
            return;
        }
        const postId = Number(req.params.postId);
        try {
            const result = await typeorm_1.createQueryBuilder('Post').where({ id: postId }).select().innerJoinAndSelect("Post.account", "account").getOne();
            console.log(result);
            if (result === undefined) {
                message.code = message_1.Message.DefaultCode.NOT_FOUND;
                return;
            }
            message.data = {
                id: result["id"],
                title: result["title"],
                content: result["content"],
                username: result["account"]["username"],
                accountId: result["account"]["id"]
            };
        }
        catch (err) {
            console.log(err);
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
        }
    }
}))
    .delete(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (!validator_1.default.isNumeric(req.params.postId)) {
            message.code = message_1.Message.DefaultCode.VALIDATION_ERROR;
        }
        const postId = Number(req.params.postId);
        //나중에 role 만들어서 어드민 추가
        try {
            const result = await typeorm_1.createQueryBuilder('Post').where({ id: postId }).innerJoinAndSelect("Post.account", "account").getOne();
            if (result === undefined) {
                message.code = message_1.Message.DefaultCode.NOT_FOUND;
                return;
            }
            if (!(req.session.accountId && req.session.accountId === result["account"]["id"])) {
                message.code = message_1.Message.DefaultCode.PERMISSION_ERROR;
                return;
            }
            await handle_1.Handle.dbConnection.getRepository(post_1.Post).delete({
                id: postId
            });
        }
        catch (err) {
            console.log(err);
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
        }
    }
}));
router.route('/')
    .put(routerTemplate_1.RouterTemplate.create({
    validations: [
        {
            name: 'title',
            type: 'string',
            regex: /[\s\S]{1,100}/
        },
        {
            name: 'content',
            type: 'string',
            regex: /[\s\S]{1,3000}/
        },
    ],
    hook: async (req, res, message) => {
        const title = req.body.title;
        const content = req.body.content;
        const postRepo = handle_1.Handle.dbConnection.getRepository(post_1.Post);
        if (!req.session.accountId) {
            message.code = message_1.Message.DefaultCode.PERMISSION_ERROR;
            return;
        }
        try {
            const post = postRepo.create({
                title: title,
                content: content,
                account: req.session.accountId
            });
            postRepo.save(post);
        }
        catch (err) {
            message.code = message_1.Message.DefaultCode.ACTION_FAIL;
        }
    }
}));
router.route('/page/:page')
    .get(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        const ammountPerPage = 10;
        if (validator_1.default.isNumeric(req.params.page)) {
            const page = Number(req.params.page);
            try {
                const result = await typeorm_1.createQueryBuilder('Post').orderBy('Post.id', 'DESC')
                    .offset((page - 1) * ammountPerPage).limit(ammountPerPage).leftJoinAndSelect('Post.account', 'account').getMany();
                const posts = [];
                for (const post of result) {
                    posts.push({
                        username: (post["account"]["username"]) ? post["account"]["username"] : "Unknown",
                        title: post["title"],
                        content: post["content"],
                        id: post["id"]
                    });
                }
                message.data = posts;
            }
            catch (err) {
                message.code = message_1.Message.DefaultCode.ACTION_FAIL;
                return;
            }
        }
        else {
            if (req.params.page === "max") {
                try {
                    const postCount = await handle_1.Handle.dbConnection.getRepository(post_1.Post).count();
                    message.data = Math.ceil(postCount / ammountPerPage);
                }
                catch (err) {
                    message.code = message_1.Message.DefaultCode.ACTION_FAIL;
                    return;
                }
            }
            else {
                message.code = message_1.Message.DefaultCode.NOT_FOUND;
                return;
            }
        }
    }
}));
exports.default = router;
//# sourceMappingURL=postsRouter.js.map