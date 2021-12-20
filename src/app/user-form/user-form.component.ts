import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DEL_USER_URL, GET_USER_URL, SAVE_USER_URL} from "../app.constants";
import {MbUser} from "../model/mb-user";
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {ActivatedRoute, Router} from "@angular/router";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    mbUser: MbUser = new MbUser();

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbUser>>(GET_USER_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                   return;
                }
                this.mbUser = response.data;
            })
        }
    }

    ngOnInit(): void {
    }

    async save(): Promise<any> {
        this.httpClient.post<CCResult>(SAVE_USER_URL, this.mbUser).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['user', 'list']);
        });
    }

    async del(): Promise<any> {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCResult>(DEL_USER_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['user', 'list']);
            });
        }
    }

}
