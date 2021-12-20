import { __awaiter, __generator } from "tslib";
var SignupHelper = /** @class */ (function () {
    function SignupHelper() {
    }
    /**
     * 사업자 등록번호 검증
     * @param regNumber 사업자등록번호
     * @return boolean 검증결과
     */
    SignupHelper.prototype.validRegNumber = function (regNumber) {
        if ($.trim(regNumber).length === 0) {
            alert("사업자 번호를 먼저 입력해주세요.");
            return false;
        }
        var valueMap = regNumber.replace(/-/gi, '').split('').map(function (item) {
            return parseInt(item, 10);
        });
        valueMap.map(function (item) {
            if (isNaN(item)) {
                return false;
            }
        });
        // tslint:disable-next-line:no-magic-numbers
        if (valueMap.length === 10) {
            return true;
        }
        return false;
    };
    /**
     * 이메일/사업자 번호 중복 체크
     */
    SignupHelper.prototype.signupDupCheckByType = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = 0;
                        url = this.getDupCheckURL(type, value);
                        return [4 /*yield*/, $.getJSON(url, function (data) {
                                alert(data.message);
                                if (data.result === true) {
                                    result = 1;
                                }
                                else {
                                    result = 0;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SignupHelper.prototype.getDupCheckURL = function (type, value) {
        var url = "";
        switch (type) {
            case "email":
                url = '/checkDupByType?type=email&value=' + value;
                break;
            case "regNumber":
                url = '/checkDupByType?type=regNumber&value=' + value;
                break;
        }
        return url;
    };
    return SignupHelper;
}());
export { SignupHelper };
//# sourceMappingURL=signup-helper.js.map