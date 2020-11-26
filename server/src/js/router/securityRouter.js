"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_forge_1 = __importDefault(require("node-forge"));
const routerTemplate_1 = require("../routerHelper/routerTemplate");
const router = express_1.default.Router();
router.route('/publicKey')
    .get(routerTemplate_1.RouterTemplate.create({
    hook: async (req, res, message) => {
        if (!req.session.publicKey) {
            var rsa = node_forge_1.default.pki.rsa;
            var keypair = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
            req.session.publicKey = node_forge_1.default.pki.publicKeyToPem(keypair.publicKey);
            req.session.privateKey = node_forge_1.default.pki.privateKeyToPem(keypair.privateKey);
        }
        message.data = req.session.publicKey;
    }
}));
exports.default = router;
//# sourceMappingURL=securityRouter.js.map