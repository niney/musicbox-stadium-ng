import {Component, OnInit} from '@angular/core';
import {ListBase} from "../base/list-base";
import {MbPlayerBbs} from "../model/mb-player-bbs";
import {HttpClient} from "@angular/common/http";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {Router} from "@angular/router";
import {SEARCH_CLUB_BBS_URL} from "../app.constants";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {MbClubBbs} from "../model/mb-club-bbs";

@Component({
    selector: 'app-club-bbs-list',
    templateUrl: './club-bbs-list.component.html',
    styleUrls: ['./club-bbs-list.component.scss']
})
export class ClubBbsListComponent extends ListBase implements OnInit {

    itemList: Array<MbClubBbs> = new Array<MbClubBbs>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);

        this.initLoad(SEARCH_CLUB_BBS_URL).then((result) => {
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

    goDetail(item: MbClubBbs): void {
        this.router.navigate(['clubBbs', 'form', item.id]);
    }

    async loadItemList(paramObj: any): Promise<any> {
        let url = SEARCH_CLUB_BBS_URL;
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
