import express from 'express'
import session from 'express-session'
import {createConnection, Connection} from 'typeorm';
import { Handle } from './handle';
import path from 'path'
import accountsRouter from './router/accountsRouter'
import postsRouter from './router/postsRouter'
import sessionRouter from './router/sessionRouter'
const app = express();
app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(express.json({
    limit: 12000
}));
app.use(session({
    secret: 'chickenisgood',
    resave: false,
    saveUninitialized: false
}));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('URL', req.url);
    console.log('바디', req.body);
    next();
})
app.use('/accounts', accountsRouter);
app.use('/posts', postsRouter);
app.use('/session', sessionRouter);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {

    if(req.method === "GET") {
        res.type("html");
        res.sendFile(path.resolve(__dirname, '../../public/spa.html'));
    } else {
        next();
    }
});
createConnection()
.then((connection: Connection) => {
    Handle.dbConnection = connection;
    console.log("데이터 베이스 연결 성공");
    app.listen(3000, () => {
        console.log('LISTENING SUCCESS'); 
    });
}).catch((err: any) => {
    console.log(err);
})
