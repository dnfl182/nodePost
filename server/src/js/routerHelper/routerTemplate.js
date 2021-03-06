"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterTemplate = void 0;
const validator_1 = __importDefault(require("validator"));
const message_1 = require("./message");
class RouterTemplate {
    static create(option) {
        return async (req, res) => {
            const message = new message_1.Message(message_1.Message.DefaultCode.SUCCESS, {});
            let flagValidationError = false;
            if (option.validations) {
                for (const validation of option.validations) {
                    let value = undefined;
                    value = req.body[validation.name];
                    if (validation.isVital === undefined) {
                        validation.isVital = true;
                    }
                    if (!value) {
                        if (!validation.isVital) {
                            continue;
                        }
                        else {
                            flagValidationError = true;
                            break;
                        }
                    }
                    if (!validation.type) {
                        validation.type = 'string';
                    }
                    if (validation.type === 'number' && !validator_1.default.isNumeric(value)) {
                        flagValidationError = true;
                        break;
                    }
                    else if (validation.type === 'boolean' && !validator_1.default.isBoolean(value)) {
                        flagValidationError = true;
                        break;
                    }
                    if (validation.type === 'string' && validation.regex && !validation.regex.test(value)) {
                        flagValidationError = true;
                        break;
                    }
                }
            }
            if (flagValidationError) {
                message.code = message_1.Message.DefaultCode.VALIDATION_ERROR;
                res.contentType("application/json");
                res.json(message.serialize());
                return;
            }
            await option.hook(req, res, message);
            res.contentType("application/json");
            res.json(message.serialize());
        };
    }
}
exports.RouterTemplate = RouterTemplate;
//# sourceMappingURL=routerTemplate.js.map