import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./default-layout/default-layout.component";
import {VideoListComponent} from "./video-list/video-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {GameListComponent} from "./game-list/game-list.component";
import {GameFormComponent} from "./game-form/game-form.component";
import {VideoFormComponent} from "./video-form/video-form.component";
import {PlayerListComponent} from "./player-list/player-list.component";
import {PlayerFormComponent} from "./player-form/player-form.component";
import {DeviceListComponent} from "./device-list/device-list.component";
import {DeviceFormComponent} from "./device-form/device-form.component";
import {PlayerBbsListComponent} from "./player-bbs-list/player-bbs-list.component";
import {PlayerBbsFormComponent} from "./player-bbs-form/player-bbs-form.component";
import {ClubBbsListComponent} from "./club-bbs-list/club-bbs-list.component";
import {ClubBbsFormComponent} from "./club-bbs-form/club-bbs-form.component";

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'video/list',
                component: VideoListComponent
            },
            {
                path: 'video/form',
                component: VideoFormComponent
            },
            {
                path: 'video/form/:id',
                component: VideoFormComponent
            },
            {
                path: 'game/list',
                component: GameListComponent
            },
            {
                path: 'game/form',
                component: GameFormComponent
            },
            {
                path: 'game/form/:id',
                component: GameFormComponent
            },
            {
                path: 'device/list',
                component: DeviceListComponent
            },
            {
                path: 'device/form',
                component: DeviceFormComponent
            },
            {
                path: 'device/form/:id',
                component: DeviceFormComponent
            },
            {
                path: 'player/list',
                component: PlayerListComponent
            },
            {
                path: 'player/form',
                component: PlayerFormComponent
            },
            {
                path: 'player/form/:id',
                component: PlayerFormComponent
            },
            {
                path: 'user/list',
                component: UserListComponent
            },
            {
                path: 'user/form',
                component: UserFormComponent
            },
            {
                path: 'user/form/:id',
                component: UserFormComponent
            },
            {
                path: 'playerBbs/list',
                component: PlayerBbsListComponent
            },
            {
                path: 'playerBbs/form',
                component: PlayerBbsFormComponent
            },
            {
                path: 'playerBbs/form/:id',
                component: PlayerBbsFormComponent
            },
            {
                path: 'clubBbs/list',
                component: ClubBbsListComponent
            },
            {
                path: 'clubBbs/form',
                component: ClubBbsFormComponent
            },
            {
                path: 'clubBbs/form/:id',
                component: ClubBbsFormComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
