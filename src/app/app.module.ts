import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

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
import { VideoListComponent } from './video-list/video-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
export class AppModule { }
