import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform {

    transform(value: any, format: string): unknown {
        if (!value) {
            return;
        }
        return moment(value).format(format);
    }

}
