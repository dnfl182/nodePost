import { AJAX } from "../ajax/ajax";
import { Message } from "../ajax/message";

export class AccountsRequest {
    public static async register(username: string, password: string): Promise<boolean>{
        const result = await AJAX.ajax(AJAX.Method.PUT, '/accounts', {
            username: username,
            password: password
        })
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            return true;
        }
    }

    public static async isExistUsername(username: string): Promise<boolean | undefined> {
        const result = await AJAX.ajax(AJAX.Method.POST, '/accounts/isExistUsername', {
            username: username
        })
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }

    public static async getAccount(accountId: number): Promise<any | undefined> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/accounts/${accountId}`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
}