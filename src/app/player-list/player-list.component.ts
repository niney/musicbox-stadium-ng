import {Component, OnInit} from '@angular/core';
import {MbPlayer} from "../model/mb-player";
import {ListBase} from "../base/list-base";
import {HttpClient} from "@angular/common/http";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {Router} from "@angular/router";
import {SEARCH_PLAYER_URL} from "../app.constants";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {MbUploadFile} from "../model/mb-upload-file";

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent extends ListBase implements OnInit {

    itemList: Array<MbPlayer> = new Array<MbPlayer>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);

        this.initLoad(SEARCH_PLAYER_URL).then((result) => {
            if (!result.response) {
                return;
            }
            this.itemList = result.response.data;
            result.pageInstance.on('beforeMove', (evt: any) => {
                const selectedPage = evt.page;
                this.loadItemList({
                    page: selectedPage
                })
            });
        });
    }

    ngOnInit(): void {
    }

    goDetail(item: MbPlayer): void {
        this.router.navigate(['player', 'form', item.id]);
    }

    async loadItemList(paramObj: any): Promise<any> {
        let url = SEARCH_PLAYER_URL;
        if (paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbPlayer>>(url));
        if (!response.result) {
            return;
        }
        this.itemList = response.data;
    }
}
