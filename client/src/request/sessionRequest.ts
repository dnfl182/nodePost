import { AJAX } from "../ajax/ajax";
import { Message } from "../ajax/message";
import { SessionChangeEventRevoker } from "../revoker/sessionChangeEventRevoker";

export class SessionRequest {
    public static async login(username: string, password: string): Promise<boolean>{
        const result = await AJAX.ajax(AJAX.Method.PUT, '/session', {
            username: username,
            password: password
        })
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            SessionChangeEventRevoker.revoke();
            return true;
        }
    }
    public static async logout(): Promise<boolean> {
        const result = await AJAX.ajax(AJAX.Method.DELETE, '/session')
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            SessionChangeEventRevoker.revoke();
            return true;
        }
    }
    public static async getAccountId(): Promise<number | undefined> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/session`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
    public static async isLogined(): Promise<boolean> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/session`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return true;
        } else {
            return false;
        }
    }
}