import {MbBase} from "./mb-base";

export enum MbUserStatus {
    normal, withdrawal
}

export class MbUser extends MbBase {
    userId: string = '';
    password: string = '';
    username: string = '';
    nickname: string = '';
    tel: string = '';
    zipcode: string = '';
    address1: string = '';
    address2: string = '';
    address3: string = '';
    email: string = '';
    identityVerify: boolean = false;
    emailVerify: boolean = false;
    infoAgree: boolean = false;
    smsAgree: boolean = false;
    emailAgree: boolean = false;
    thirdPartyAgree: boolean = false;
    isBlock: boolean = false;
    auth: string = '';
    status: MbUserStatus = MbUserStatus.normal;
    latestConnectionDate: string = '';
}
