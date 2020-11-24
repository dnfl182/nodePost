import { AJAX } from "../ajax/ajax";
import { Message } from "../ajax/message";

export class PostsRequest {
    public static async create(title: string, content: string): Promise<boolean>{
        const result = await AJAX.ajax(AJAX.Method.PUT, '/posts', {
            title: title,
            content: content
        })
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            return true;
        }
    }
    public static async get(postId: number): Promise<any | undefined> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/posts/${postId}`)
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
    public static async delete(postId: number): Promise<boolean> {
        const result = await AJAX.ajax(AJAX.Method.DELETE, `/posts/${postId}`)
        if(result.code !== Message.DefaultCode.SUCCESS) {
            return false;
        } else {
            return true;
        }
    }

    public static async getPage(page: number): Promise<any | undefined> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/posts/page/${page}`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
    public static async getMaxPage(): Promise<number | undefined> {
        const result = await AJAX.ajax(AJAX.Method.GET, `/posts/page/max`);
        if(result.code === Message.DefaultCode.SUCCESS) {
            return result.data;
        } else {
            return undefined;
        }
    }
}