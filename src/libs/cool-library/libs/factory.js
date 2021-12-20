import { DateHelper } from './date-helper';
import { FileHelper } from "./file-helper";
import { Login } from './login';
import { SignupHelper } from "./signup-helper";
import { StorageHelper } from "./storage-helper";
import { UrlHelper } from './url-helper';
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.newInstanceLogin = function () {
        return new Login();
    };
    Factory.newInstanceUrlHelper = function () {
        return new UrlHelper();
    };
    Factory.newInstanceDateHelper = function () {
        return new DateHelper();
    };
    Factory.newInstanceFileHelper = function () {
        return new FileHelper();
    };
    Factory.newInstanceStorageHelper = function () {
        return new StorageHelper();
    };
    Factory.newInstanceSignupHelper = function () {
        return new SignupHelper();
    };
    return Factory;
}());
export { Factory };
//# sourceMappingURL=factory.js.map
