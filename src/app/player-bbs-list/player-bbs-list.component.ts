import {Component, OnInit} from '@angular/core';
import {ListBase} from "../base/list-base";
import {HttpClient} from "@angular/common/http";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {Router} from "@angular/router";
import {SEARCH_PLAYER_BBS_URL} from "../app.constants";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {MbPlayerBbs} from "../model/mb-player-bbs";

@Component({
    selector: 'app-player-bbs-list',
    templateUrl: './player-bbs-list.component.html',
    styleUrls: ['./player-bbs-list.component.scss']
})
export class PlayerBbsListComponent extends ListBase implements OnInit {

    itemList: Array<MbPlayerBbs> = new Array<MbPlayerBbs>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);

        this.initLoad(SEARCH_PLAYER_BBS_URL).then((result) => {
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

    goDetail(item: MbPlayerBbs): void {
        this.router.navigate(['playerBbs', 'form', item.id]);
    }

    async loadItemList(paramObj: any): Promise<any> {
        let url = SEARCH_PLAYER_BBS_URL;
        if (paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbPlayerBbs>>(url));
        if (!response.result) {
            return;
        }
        this.itemList = response.data;
    }

}
