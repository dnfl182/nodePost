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
    DefaultCode[DefaultCode["PERMISSION_ERROR"] = 1004] = "PERMISSION_ERROR";
    DefaultCode[DefaultCode["KEY_NOT_FOUND"] = 1005] = "KEY_NOT_FOUND";
})(DefaultCode || (DefaultCode = {}));
class Message {
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }
    serialize() {
        return {
            code: this.code,
            data: this.data
        };
    }
}
exports.Message = Message;
Message.DefaultCode = DefaultCode;
//# sourceMappingURL=message.js.map