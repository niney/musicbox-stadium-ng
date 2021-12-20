import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {FILE_UPLOAD_URL} from "../app.constants";
import {MbUploadFile} from "../model/mb-upload-file";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {

    @Input() uploadFileList: Array<MbUploadFile> = new Array<MbUploadFile>();
    @Input() isMultiple = false;
    @Output() completeEvent = new EventEmitter<MbUploadFile>();

    @ViewChild('refFile')
    refFileElement!: ElementRef;

    constructor(
    ) {
    }

    ngAfterViewInit(): void {
        ($(this.refFileElement.nativeElement) as any).fileupload({
            url: FILE_UPLOAD_URL,
            dataType: 'json',
            //replaceFileInput: false,
            add: function (e: any, data: any) {
                const uploadFile = data.files[0];
                const isValid = true;
                data.submit();
            }, progressall: (e: any, data: any) => {
                // console.log(data);
                let percent = data.loaded / data.total * 100;
                const progress = parseInt(percent.toString(), 10);
                const $progress = $('#progress .bar');
                $progress.css(
                    'width',
                    progress + '%'
                );
            }, done: (e: any, response: any) => {
                let responseResult = response.result;
                const data = responseResult.data;
                const $progress = $('#progress .bar');
                $progress.css(
                    'width',
                    0 + '%'
                );
                if(responseResult.result) {
                    if(!this.isMultiple) {
                        this.uploadFileList = [];
                    }
                    this.uploadFileList.push(data);
                    this.completeEvent.emit(data);
                }
            }, fail: function (e: any, data: any) {
                // data.errorThrown // data.textStatus; // data.jqXHR;
                alert('서버와 통신 중 문제가 발생했습니다');
            }
        });
    }

    ngOnInit(): void {
    }

}
