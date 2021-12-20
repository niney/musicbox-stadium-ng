import {Component, OnInit} from '@angular/core';
import {MbDevice} from "../model/mb-device";
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {DEL_DEVICE_URL, GET_DEVICE_URL, SAVE_DEVICE_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";

@Component({
    selector: 'app-device-form',
    templateUrl: './device-form.component.html',
    styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit {

    item: MbDevice = new MbDevice();

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.initItem();
    }

    ngOnInit(): void {
    }

    async initItem() {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbDevice>>(GET_DEVICE_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                this.item = response.data;
            })
        }
    }

    save(): void {
        this.httpClient.post<CCResult>(SAVE_DEVICE_URL, this.item).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['device', 'list']);
        });
    }

    del(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCResult>(DEL_DEVICE_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['device', 'list']);
            })
        }
    }

    disconnect(): void {
        delete this.item.userId;
        this.save();
    }

}
