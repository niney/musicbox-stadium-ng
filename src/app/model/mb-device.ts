import {MbBase} from "./mb-base";
import {MbUser} from "./mb-user";

export class MbDevice extends MbBase {
    sn: string = '';
    buyerName: string = '';
    buyerTel: string = '';
    buyerEmail: string = '';
    purchaseAt: string = '';
    isOnDevice: boolean = false;
    userId!: number |  undefined;
    user!: MbUser;
}
