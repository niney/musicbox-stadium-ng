import {Component, OnDestroy, OnInit} from '@angular/core';
import {MbPlayerBbs} from "../model/mb-player-bbs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CCObjectResult} from "../../libs/cool-library/libs/model/CCObjectResult";
import {DEL_PLAYER_BBS_URL, GET_PLAYER_BBS_URL, SAVE_PLAYER_BBS_URL} from "../app.constants";
import {CCResult} from "../../libs/cool-library/libs/model/CCResult";
import {MbUser} from "../model/mb-user";
import {LazyLoadScriptService} from "../service/lazy-load-script.service";

declare const document: any;
declare const oEditors: any;
declare const window: any;

@Component({
    selector: 'app-player-bbs-form',
    templateUrl: './player-bbs-form.component.html',
    styleUrls: ['./player-bbs-form.component.scss']
})
export class PlayerBbsFormComponent implements OnInit, OnDestroy {

    item: MbPlayerBbs = new MbPlayerBbs();

    constructor(
        private httpClient: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private lazyLoadScriptService: LazyLoadScriptService
    ) {
        this.item.writerId = 1;
        this.initItem();
    }

    ngOnInit(): void {
        this.settingEditorTemplate();
    }

    ngOnDestroy(): void {
        if (window.smarteditorOnAppLoad) {
            window.smarteditorOnAppLoad = undefined;
        }
    }

    async initItem() {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbPlayerBbs>>(GET_PLAYER_BBS_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    return;
                }
                this.item = response.data;
                this.item.playerName = this.item.player.playerName;

                window.smarteditorOnAppLoad = (id: string) => {
                    if (id === "contents") {
                        oEditors.getById[id].exec("PASTE_HTML", [this.item.contents]);
                    }
                }
            })
        }
    }

    save(): void {
        // editor 내용 가져오기
        const contents_editor_data = oEditors.getById["contents"].getIR();
        oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);
        if ($.inArray(document.getElementById("contents").value.toLowerCase().replace(/^\s*|\s*$/g, ""), ["&nbsp;", "<p>&nbsp;</p>", "<p><br></p>", "<div><br></div>", "<p></p>", "<br>", ""]) != -1) {
            document.getElementById("contents").value = "";
        }
        if (contents_editor_data) {
            this.item.contents = contents_editor_data;
        }
        this.httpClient.post<CCResult>(SAVE_PLAYER_BBS_URL, this.item).subscribe(response => {
            if (!response.result) {
                alert('저장 실패');
                return;
            }
            this.router.navigate(['playerBbs', 'list']);
        });
    }

    del(): void {
        const params = this.activatedRoute.snapshot.params;
        if (params['id']) {
            this.httpClient.get<CCObjectResult<MbUser>>(DEL_PLAYER_BBS_URL + "?id=" + params['id']).subscribe(response => {
                if (!response.result) {
                    alert('삭제 실패');
                    return;
                }
                this.router.navigate(['playerBbs', 'list']);
            })
        }
    }

    /**
     * 에디터 삽입
     */
    async settingEditorTemplate() {
        const samplepcbUrl = '/assets';

        const template = `
<!--<script src="${samplepcbUrl}/plugin/editor/smarteditor2/js/service/HuskyEZCreator.js"></script>-->
<script>var g5_editor_url = "${samplepcbUrl}/plugin/editor/smarteditor2", oEditors = [], ed_nonce = "32FRqI4uQA|1631386254|20393f10e545ccb43a42bc7200314a0dc827da44";</script>
<!--<script src="${samplepcbUrl}/plugin/editor/smarteditor2/config.js"></script>-->
<script>
        $(function(){
            $(".btn_cke_sc").on('click', function(){
                if ($(this).next("div.cke_sc_def").length) {
                    $(this).next("div.cke_sc_def").remove();
                    $(this).text("단축키 일람");
                } else {
                    $(this).after("<div class='cke_sc_def' />").next("div.cke_sc_def").load("${samplepcbUrl}/plugin/editor/smarteditor2/shortcut.html");
                    $(this).text("단축키 일람 닫기");
                }
            });
            $(document).on("click", ".btn_cke_sc_close", function(){
                $(this).parent("div.cke_sc_def").remove();
            });
        });
</script>
<textarea id="contents" name="contents" class="smarteditor2" maxlength="65536" style="width:100%;height:300px"></textarea>`;

        $('#editor').html(template);

        const husky = 'service/HuskyEZCreator.js';
        const smarteditor = 'smarteditor2/config.js';
        this.lazyLoadScriptService.removeScript(husky);
        this.lazyLoadScriptService.removeScript(smarteditor);
        await this.lazyLoadScriptService.loadScriptNoCache(husky, `${samplepcbUrl}/plugin/editor/smarteditor2/js/service/HuskyEZCreator.js`);
        await this.lazyLoadScriptService.loadScriptNoCache(smarteditor, `${samplepcbUrl}/plugin/editor/smarteditor2/config.js`);
    }


}
