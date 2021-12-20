import {Component, OnInit} from '@angular/core';
import {MbGame} from "../model/mb-game";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {SEARCH_GAME_URL, SEARCH_USER_URL} from "../app.constants";
import {Router} from "@angular/router";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {ListBase} from "../base/list-base";
import {MbUser} from "../model/mb-user";

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends ListBase implements OnInit {

    gameList: Array<MbGame> = new Array<MbGame>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);
        this.initLoad(SEARCH_GAME_URL).then((result) => {
            if(!result.response) {
                return;
            }
            this.gameList = result.response.data;
            result.pageInstance.on('beforeMove', (evt: any) => {
                const selectedPage = evt.page;
                this.loadGameList({
                    page: selectedPage
                })
            });
        });
    }

    ngOnInit(): void {
    }

    async loadGameList(paramObj: any): Promise<any> {
        let url = SEARCH_GAME_URL;
        if (paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbGame>>(url));
        if (!response.result) {
            return;
        }
        this.gameList = response.data;
    }

    goDetail(game: MbGame): void {
        this.router.navigate(['game', 'form', game.id]);
    }

}
