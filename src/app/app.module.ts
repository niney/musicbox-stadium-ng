import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultLayoutComponent} from './default-layout/default-layout.component';

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {IconModule, IconSetModule, IconSetService} from '@coreui/icons-angular';
import {VideoListComponent} from './video-list/video-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-form/user-form.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {GameListComponent} from './game-list/game-list.component';
import {GameFormComponent} from './game-form/game-form.component';
import {MomentPipe} from './pipe/moment.pipe';
import { VideoFormComponent } from './video-form/video-form.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { UploadComponent } from './upload/upload.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { PlayerBbsListComponent } from './player-bbs-list/player-bbs-list.component';
import { PlayerBbsFormComponent } from './player-bbs-form/player-bbs-form.component';
import { ClubBbsListComponent } from './club-bbs-list/club-bbs-list.component';
import { ClubBbsFormComponent } from './club-bbs-form/club-bbs-form.component';

@NgModule({
    declarations: [
        AppComponent,
        DefaultLayoutComponent,
        VideoListComponent,
        UserListComponent,
        UserFormComponent,
        GameListComponent,
        GameFormComponent,
        MomentPipe,
        VideoFormComponent,
        PlayerListComponent,
        PlayerFormComponent,
        UploadComponent,
        DeviceListComponent,
        DeviceFormComponent,
        PlayerBbsListComponent,
        PlayerBbsFormComponent,
        ClubBbsListComponent,
        ClubBbsFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        IconModule,
        IconSetModule.forRoot(),
    ],
    providers: [
        IconSetService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
