import {Component, OnInit} from '@angular/core';
import {MbVideo} from "../model/mb-video";
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {DEL_VIDEO_URL, GET_PLAYER_URL, GET_VIDEO_URL, SAVE_VIDEO_URL, STREAMING_FILENAME_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";
import {MbUser} from "../model/mb-user";
import {MbUploadFile} from "../model/mb-upload-file";
import {MbPlayer} from "../model/mb-player";

@Component({
    selector: 'app-video-form',
    templateUrl: './video-form.component.html',
    styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

    item: MbVideo = new MbVideo();
    uploadFileList: Array<MbUploadFile> = new Array<MbUploadFile>();
    fullUrl: string = '';
    player!: MbPlayer

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.item.writerId = 1;
        this.initItem();
    }

    ngOnInit(): void {
    }

    async initItem() {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbVideo>>(GET_VIDEO_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                this.item = response.data;
                if (this.item.url) {
                    const uploadFile = new MbUploadFile();
                    uploadFile.url = this.item.url;
                    uploadFile.filename = this.item.filename;
                    uploadFile.filesize = this.item.filesize;
                    this.completeUpload(uploadFile);
                }
            })
        }
        // player id 가 있는 경우
        this.activatedRoute.queryParams.subscribe(queryParams => {
            const playerId = queryParams['playerId'];
            if (playerId) {
                this.httpClient.get<CCObjectResult<MbPlayer>>(GET_PLAYER_URL + "?id=" + playerId).subscribe(response => {
                    if (!response.result) {
                        return;
                    }
                    this.player = response.data;
                })

            }
        });
    }

    save(): void {
        if (this.player) {
            this.item.playerId = this.player.id;
        }
        this.httpClient.post<CCResult>(SAVE_VIDEO_URL, this.item).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['video', 'list']);
        });
    }

    del(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbUser>>(DEL_VIDEO_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['video', 'list']);
            })
        }
    }

    completeUpload(uploadFile: MbUploadFile): void {
        this.item.url = uploadFile.url;
        this.item.filename = uploadFile.filename;
        this.item.filesize = uploadFile.filesize;
        this.uploadFileList = [uploadFile];
        this.fullUrl = STREAMING_FILENAME_URL + '?url=' + encodeURIComponent(uploadFile.url);
    }
}
