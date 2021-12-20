import {MbBase} from "./mb-base";
import {MbUploadFile} from "./mb-upload-file";

export class MbGame extends MbBase  {
    matchDate: string = '';
    matchPlace: string = '';
    status: string = '';
    imageMeta!: Array<MbUploadFile> | string;
}
