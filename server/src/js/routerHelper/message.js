"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
//0~1000 라우터 재량 영역
var DefaultCode;
(function (DefaultCode) {
    DefaultCode[DefaultCode["SUCCESS"] = 1000] = "SUCCESS";
    DefaultCode[DefaultCode["VALIDATION_ERROR"] = 1001] = "VALIDATION_ERROR";
    DefaultCode[DefaultCode["NOT_FOUND"] = 1002] = "NOT_FOUND";
    DefaultCode[DefaultCode["ACTION_FAIL"] = 1003] = "ACTION_FAIL";
})(DefaultCode || (DefaultCode = {}));
class Message {
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }
    toData() {
        return {
            code: this.code,
            data: this.data
        };
    }
}
exports.Message = Message;
Message.DefaultCode = DefaultCode;
//# sourceMappingURL=message.js.map