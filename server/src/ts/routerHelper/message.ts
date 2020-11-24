//0~1000 라우터 재량 영역
enum DefaultCode {
    SUCCESS = 1000,
    VALIDATION_ERROR,
    NOT_FOUND,
    ACTION_FAIL
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