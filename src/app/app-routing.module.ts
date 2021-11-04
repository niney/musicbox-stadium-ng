import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./default-layout/default-layout.component";
import {VideoListComponent} from "./video-list/video-list.component";

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'video/list',
                component: VideoListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
