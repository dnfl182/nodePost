enum DefaultCode {
    SUCCESS,
    VALIDATION_ERROR
}
export class Message {
    constructor(public code: number, public data: any) {

    }
    public toData() {
        return {
            code: this.code,
            data: this.data
        };
    }
    public static DefaultCode = DefaultCode;
}