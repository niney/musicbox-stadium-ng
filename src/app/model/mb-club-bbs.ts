import {MbBase} from "./mb-base";
import {MbUser} from "./mb-user";

export class MbClubBbs extends MbBase {
    title: string = '';
    contents: string = '';
    views: number = 0;
    writerId: number = 0;
    writer: MbUser = new MbUser();
    open: number = 1;
}
