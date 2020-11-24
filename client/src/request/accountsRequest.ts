import { AJAX } from "../ajax/ajax";
import { Message } from "../ajax/message";

export class AccountsRequest {
    public static async login(username: string, password: string): Promise<boolean>{
        const result = await AJAX.ajax(AJAX.Method.POST, '/accounts/login', {
            username: username,
            password: password
        })
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            return true;
        }
    }
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
    public static async logout(): Promise<boolean> {
        const result = await AJAX.ajax(AJAX.Method.POST, '/accounts/logout')
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
        console.log(result, typeof result);
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
    public static async isLogined(): Promise<boolean | undefined> {
        const result = await AJAX.ajax(AJAX.Method.POST, `/accounts/isLogined`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
}