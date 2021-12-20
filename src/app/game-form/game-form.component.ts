import {Component, OnInit} from '@angular/core';
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {DEL_GAME_URL, GET_GAME_URL, SAVE_GAME_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {MbGame} from "../model/mb-game";
import {ActivatedRoute, Router} from "@angular/router";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";
import {MbUploadFile} from "../model/mb-upload-file";

// typings install --save --global dt~momen

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

    item: MbGame = new MbGame();
    uploadFileList: Array<MbUploadFile> = new Array<MbUploadFile>();

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private lazyLoadScriptService: LazyLoadScriptService
    ) {
    }

    ngOnInit(): void {
        this.initItem();
    }

    async initItem() {
        await this.lazyLoadScriptService.loadBootstrapDatePicker();

        this.item.matchDate = moment().format();

        const $matchDate = $('#matchDate') as any;
        $matchDate.datetimepicker({
            inline: true,
            sideBySide: true,
            locale: 'ko',
            dayViewHeaderFormat: 'YYYY MMMM',
            format: 'YYYY년 MMMM Do a h시 mm분',
        })
        $matchDate.on('change.datetimepicker', (dateObj: any) => {
            this.item.matchDate = dateObj.date.format();
        });

        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbGame>>(GET_GAME_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                if (response.data.imageMeta) {
                    response.data.imageMeta = JSON.parse(response.data.imageMeta as string);
                    this.uploadFileList = response.data.imageMeta as Array<MbUploadFile>;
                }
                this.item = response.data;
                const $matchDate = $('#matchDate') as any;
                $matchDate.datetimepicker('date', this.item.matchDate);
            })
        }
    }

    async save(): Promise<any> {
        if (this.uploadFileList.length !== 0) {
            this.item.imageMeta = JSON.stringify(this.uploadFileList); // json string 으로 저장
        }
        this.httpClient.post<CCResult>(SAVE_GAME_URL, this.item).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['game', 'list']);
        });
    }

    del(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCResult>(DEL_GAME_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['game', 'list']);
            })
        }
    }

}
