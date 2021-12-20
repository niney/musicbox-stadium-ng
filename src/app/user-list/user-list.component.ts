import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SEARCH_GAME_URL, SEARCH_USER_URL} from "../app.constants";
import {MbUser} from "../model/mb-user";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {Router} from "@angular/router";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {lastValueFrom} from 'rxjs';
import {ListBase} from "../base/list-base";

declare const tui: any;

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ListBase implements OnInit {

    userList: Array<MbUser> = new Array<MbUser>();

    constructor(
        httpClient: HttpClient,
        lazyLoadScriptService: LazyLoadScriptService,
        private router: Router
    ) {
        super(httpClient, lazyLoadScriptService)
        this.initLoad(SEARCH_USER_URL).then((result) => {
            if (!result.response) {
                return;
            }
            this.userList = result.response.data;
            result.pageInstance.on('beforeMove', (evt: any) => {
                const selectedPage = evt.page;
                this.loadUserList({
                    page: selectedPage
                })
            });
        });
    }

    ngOnInit(): void {
    }

    async loadUserList(paramObj: any): Promise<any> {
        let url = SEARCH_USER_URL;
        if(paramObj) {
            url += '?' + $.param(paramObj);
        }
        const response = await lastValueFrom(this.httpClient.get<CCPagingResult<MbUser>>(url));
        if (!response.result) {
            return;
        }
        this.userList = response.data;
    }

    goDetail(user: MbUser): void {
        this.router.navigate(['user', 'form', user.id]);
    }

}
