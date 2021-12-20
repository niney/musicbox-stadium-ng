import {LazyLoadScriptService} from "../service/lazy-load-script.service";
import {lastValueFrom} from "rxjs";
import {CCPagingResult} from "../../libs/cool-library/libs/model/CCPagingResult";
import {MbGame} from "../model/mb-game";
import {HttpClient} from "@angular/common/http";

declare const tui: any;

export class ListBase {

    constructor(
        protected httpClient: HttpClient,
        protected lazyLoadScriptService: LazyLoadScriptService
    ) {
    }

    initLoad(url: string): Promise<{ response: any; pageInstance: any; }> {
        const promises = [];
        promises.push(lastValueFrom(this.httpClient.get<CCPagingResult<any>>(url)));
        promises.push(this.lazyLoadScriptService.loadPagination());
        return Promise.all(promises).then(res => {
            const response = res[0];
            if (!response.result) {
                return {response: undefined, pageInstance: undefined};
            }

            const Pagination = tui.Pagination;
            const paginationId = 'tui-pagination-container';
            const container = document.getElementById(paginationId);
            const instance = new Pagination(container, {
                totalItems: response.totalCount
            });
            return {response, pageInstance: instance};
        });
    }
}
