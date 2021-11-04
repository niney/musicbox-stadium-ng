import {Component, OnInit} from '@angular/core';
import {navItems} from '../_nav';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

    public sidebarMinimized = false;
    public navItems = navItems;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleMinimize(e: any) {
        this.sidebarMinimized = e;
    }

}
