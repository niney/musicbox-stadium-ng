import {MbBase} from "./mb-base";
import {MbUser} from "./mb-user";
import {MbPlayer} from "./mb-player";

export class MbVideo extends MbBase {
    url: string = '';
    views: number = 0;
    filename: string = '';
    filesize: number = 0;
    writerId: number = 0;
    writer: MbUser = new MbUser();
    playerId: number | undefined;
}
