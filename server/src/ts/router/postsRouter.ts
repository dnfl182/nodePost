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
