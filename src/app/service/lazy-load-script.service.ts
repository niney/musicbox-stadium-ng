import {Inject, Injectable} from '@angular/core';
import {lastValueFrom, Observable, ReplaySubject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

export const TUI_PAGINATION_JS_URL = `//resource.coolmessenger.com/coolschool/resources/js/tui-pagination.js`;
export const TUI_PAGINATION_CSS_URL = `//resource.coolmessenger.com/coolschool/resources/css/tui-pagination.css`;
export const BOOTSTRAP_DATEPICKER_JS_URL = `//cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/js/tempusdominus-bootstrap-4.min.js`;
export const BOOTSTRAP_DATEPICKER_CSS_URL = `//cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/css/tempusdominus-bootstrap-4.min.css`;

@Injectable({
    providedIn: 'root'
})
export class LazyLoadScriptService {

    loadedLibraries: { [url: string]: ReplaySubject<void> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: Document) {
    }

    loadScript(url: string): Observable<void> {
        if (this.loadedLibraries[url]) {
            return this.loadedLibraries[url].asObservable();
        }

        this.loadedLibraries[url] = new ReplaySubject();

        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = () => {
            this.loadedLibraries[url].next();
            this.loadedLibraries[url].complete();
        };

        this.document.body.appendChild(script);

        return this.loadedLibraries[url].asObservable();
    }

    loadStyle(url: string): Observable<void> {

        if (this.loadedLibraries[url]) {
            return this.loadedLibraries[url].asObservable();
        }

        this.loadedLibraries[url] = new ReplaySubject();

        const link = this.document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        link.onload = () => {
            this.loadedLibraries[url].next();
            this.loadedLibraries[url].complete();
        };

        this.document.body.appendChild(link);

        return this.loadedLibraries[url].asObservable();
    }

    loadTuiPaginationScript(): Observable<any> {
        return this.loadScript(TUI_PAGINATION_JS_URL);
    }

    loadTuiPaginationCss(): Observable<any> {
        return this.loadStyle(TUI_PAGINATION_CSS_URL);
    }

    async loadPagination(): Promise<any> {
        await lastValueFrom(this.loadTuiPaginationScript());
        await lastValueFrom(this.loadTuiPaginationCss());
    }

    loadBootstrapDatePickerScript(): Observable<any> {
        return this.loadScript(BOOTSTRAP_DATEPICKER_JS_URL);
    }

    loadBootstrapDatePickerStyle(): Observable<any> {
        return this.loadStyle(BOOTSTRAP_DATEPICKER_CSS_URL);
    }

    async loadBootstrapDatePicker(): Promise<any> {
        await lastValueFrom(this.loadBootstrapDatePickerStyle());
        await lastValueFrom(this.loadBootstrapDatePickerScript());
    }

    removeScript(name: string): void {
        let scriptElm = $('script[src*="' + name + '"]');
        if (scriptElm.length !== 0) {
            return;
        }
        scriptElm.remove();
    }

    loadScriptNoCache(name: string, url: string): Promise<boolean> {
        return new Promise(resolve => {
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.onload = () => {
                resolve(true);
            }
            document.body.appendChild(script);
        });
    }
}
