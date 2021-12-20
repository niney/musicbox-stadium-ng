import {Component, OnInit} from '@angular/core';
import {MbDevice} from "../model/mb-device";
import {MbBase} from "../model/mb-base";
import {ListBase} from "../base/list-base";
import {HttpClient} from "@angular/common/http";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {Router} from "@angular/router";
import {SEARCH_DEVICE_URL, SEARCH_VIDEO_URL} from "../app.constants";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent extends ListBase implements OnInit {

    itemList: Array<MbDevice> = new Array<MbDevice>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService);

        this.initLoad(SEARCH_DEVICE_URL).then((result) => {
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

    goDetail(item: MbBase): void {
        this.router.navigate(['device', 'form', item.id]);
    }

    async loadItemList(paramObj: any): Promise<any> {
        let url = SEARCH_VIDEO_URL;
        if (paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbDevice>>(url));
        if (!response.result) {
            return;
        }
        this.itemList = response.data;
    }

}
