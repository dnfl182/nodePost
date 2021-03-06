
import libValidator from 'validator'
import express from 'express'
import { Message } from './message';
export class RouterTemplate {
    public static create(option: {
        validations?: Array<ValidationOption>;
        hook: {(req: express.Request, res: express.Response, message: Message): Promise<void>}
    }){
        return async (req: express.Request, res: express.Response) => {
            const message: Message = new Message(Message.DefaultCode.SUCCESS, {});
            let flagValidationError = false;
            if(option.validations) {
                for(const validation of option.validations) {
                    let value = undefined;
                    value = req.body[validation.name];

                    if(validation.isVital === undefined) {
                        validation.isVital = true;
                    }
                    if(!value) {
                        if(!validation.isVital) {
                            continue;
                        } else {
                            flagValidationError = true;
                            break;
                        }
                    }
                    if(!validation.type) {
                        validation.type = 'string';
                    }
                    if(validation.type === 'number' && !libValidator.isNumeric(value)) {
                        flagValidationError = true;
                        break;
                    } else if(validation.type === 'boolean' && !libValidator.isBoolean(value)) {
                        flagValidationError = true;
                        break;
                    }
                    if(validation.type === 'string' && validation.regex && !validation.regex.test(value)) {
                        flagValidationError = true;
                        break;
                    }
                } 
            }
            if(flagValidationError) {
                message.code = Message.DefaultCode.VALIDATION_ERROR;
                res.contentType("application/json");
                res.json(message.serialize());
                return;
            }
            await option.hook(req, res, message);
            res.contentType("application/json");
            res.json(message.serialize());
        }
    }
}
export interface ValidationOption {
    name: string;
    isVital?: boolean;  //default true;
    type?: string;      //default string;
    regex?: RegExp;     //default null (type == string if you want to use);
}
