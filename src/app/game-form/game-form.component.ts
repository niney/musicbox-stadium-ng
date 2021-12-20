import {Component, OnInit} from '@angular/core';
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {DEL_GAME_URL, GET_GAME_URL, SAVE_GAME_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {MbGame} from "../model/mb-game";
import {ActivatedRoute, Router} from "@angular/router";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";

// typings install --save --global dt~momen

@Component({
    selector: 'app-game-form',
    templateUrl: './game-form.component.html',
    styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

    mbGame: MbGame = new MbGame();

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

        this.mbGame.matchDate = moment().format();

        const $matchDate = $('#matchDate') as any;
        $matchDate.datetimepicker({
            inline: true,
            sideBySide: true,
            locale: 'ko',
            dayViewHeaderFormat: 'YYYY MMMM',
            format: 'YYYY년 MMMM Do a h시 mm분',
        })
        $matchDate.on('change.datetimepicker', (dateObj: any) => {
            this.mbGame.matchDate = dateObj.date.format();
        });

        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbGame>>(GET_GAME_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                this.mbGame = response.data;
                const $matchDate = $('#matchDate') as any;
                $matchDate.datetimepicker('date', this.mbGame.matchDate);
            })
        }
    }

    async save(): Promise<any> {
        this.httpClient.post<CCResult>(SAVE_GAME_URL, this.mbGame).subscribe(response => {
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
