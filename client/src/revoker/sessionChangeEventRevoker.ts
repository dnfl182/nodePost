import {v4 as uuid} from 'uuid'
import { IgnorePlugin } from 'webpack';
export class SessionChangeEventRevoker {    //EventRevoker  Store 클래스와 부모 클래스 상속으로 범용성 높이기 가능
    private static listenerMap: {
        [key: string]: {(): void};
    } = {};
    public static addListener(callback: {():void}) {
        const key = uuid();
        this.listenerMap[key] = callback;
        return key;
    }
    public static removeListener(key: string) {
        this.listenerMap[key] = undefined;
    }
    public static revoke() {
        for(const key in this.listenerMap) {
            //console.log(this.listenerMap[key]);
            if(this.listenerMap[key]) {
                this.listenerMap[key]();
            }
        }
    }
}