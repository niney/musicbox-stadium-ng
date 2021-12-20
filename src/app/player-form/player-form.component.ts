import {Component, OnInit} from '@angular/core';
import {MbPlayer} from "../model/mb-player";
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {DEL_PLAYER_URL, GET_PLAYER_URL, SAVE_PLAYER_URL} from "../app.constants";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MbUploadFile} from "../model/mb-upload-file";

@Component({
    selector: 'app-player-form',
    templateUrl: './player-form.component.html',
    styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

    item: MbPlayer = new MbPlayer();
    uploadFileList: Array<MbUploadFile> = new Array<MbUploadFile>();

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.initItem();
    }

    ngOnInit(): void {
    }

    async initItem() {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbPlayer>>(GET_PLAYER_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                if(response.data.imageMeta) {
                    response.data.imageMeta = JSON.parse(response.data.imageMeta as string);
                    this.uploadFileList = response.data.imageMeta as Array<MbUploadFile>;
                }
                this.item = response.data;
            })
        }
    }

    save(): void {
        if (this.uploadFileList.length !== 0) {
            this.item.imageMeta = JSON.stringify(this.uploadFileList); // json string 으로 저장
        }
        this.httpClient.post<CCResult>(SAVE_PLAYER_URL, this.item).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['player', 'list']);
        });
    }

    del(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCResult>(DEL_PLAYER_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['player', 'list']);
            })
        }
    }

}
