import {MbBase} from "./mb-base";
import {MbUser} from "./mb-user";
import {MbPlayer} from "./mb-player";

export class MbPlayerBbs extends MbBase {
    title: string = '';
    contents: string = '';
    views: number = 0;
    writerId: number = 0;
    writer: MbUser = new MbUser();
    playerId: number | undefined;
    player: MbPlayer = new MbPlayer();
    playerName: string = '';
    open: number = 1;
}
