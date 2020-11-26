import express from 'express'
import forge from 'node-forge'
import { Message } from '../routerHelper/message';
import { RouterTemplate } from '../routerHelper/routerTemplate';
const router = express.Router();
router.route('/publicKey')
    .get(RouterTemplate.create({
    hook: async (req: express.Request, res: express.Response, message: Message) => {
        if(!req.session.publicKey) {
            var rsa = forge.pki.rsa;
            var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
            req.session.publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
            req.session.privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
        }
        message.data = req.session.publicKey;
    }
}));
export default router;