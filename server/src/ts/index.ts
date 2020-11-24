import express from 'express'
import session from 'express-session'
import {createConnection, Connection} from 'typeorm';
import { Handle } from './handle';

const app = express();

app.use((req: express.Request, res: express.Response) => {
    res.send('Hello World');
});
app.use(express.static('/public'));
app.use(express.json());
app.use(session({
    secret: 'chickenisgood',
    resave: false,
    saveUninitialized: false
}));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
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
