import {Component, OnInit} from '@angular/core';
import {ListBase} from "../base/list-base";
import {HttpClient} from "@angular/common/http";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {Router} from "@angular/router";
import {MbVideo} from "../model/mb-video";
import {SEARCH_VIDEO_URL} from "../app.constants";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent extends ListBase implements OnInit {

    itemList: Array<MbVideo> = new Array<MbVideo>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);

        this.initLoad(SEARCH_VIDEO_URL).then((result) => {
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

    goDetail(item: MbVideo): void {
        this.router.navigate(['video', 'form', item.id]);
    }

    async loadItemList(paramObj: any): Promise<any> {
        let url = SEARCH_VIDEO_URL;
        if (paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbVideo>>(url));
        if (!response.result) {
            return;
        }
        this.itemList = response.data;
    }

}
