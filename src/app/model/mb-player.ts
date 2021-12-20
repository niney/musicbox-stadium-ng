import {MbBase} from "./mb-base";
import {MbVideo} from "./mb-video";
import {MbUploadFile} from "./mb-upload-file";

export class MbPlayer extends MbBase {
    clubName: string = '';
    uniformNumber: number | undefined = undefined;
    playerName: string = '';
    birthDay: string = '';
    nationality: string = '';
    hometown: string = '';
    body: string = '';
    position: string = '';
    foot: string = '';
    clubHistory: string = '';
    eplGoal!: number;
    eplAssist!: number;
    eplGamesPlayed!: number;
    champsGoal!: number;
    champsAssist!: number;
    champsGamesPlayed!: number;
    totalGoal!: number;
    totalAssist!: number;
    totalGamesPlayed!: number;
    opponent: string = '';
    touches!: number;
    passes!: number;
    shotsOnTarget!: number;
    shotsOnGoal!: number;
    chanceCreated!: number;
    tackleSuccess!: number;
    duelsWon!: number;
    clearances!: number;
    videos!: Array<MbVideo>;
    videoCnt: number = 0;
    imageMeta!: Array<MbUploadFile> | string;
}
