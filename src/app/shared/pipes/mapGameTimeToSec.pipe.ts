import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapGameTimeToSec'
})
export class MapGameTimeToSecPipe implements PipeTransform {

  transform(value: any, revert?: boolean): any {
    if (revert === true) {
      switch (value) {
        case 30: return 'short';
        case 60: return 'medium';
        case 90: return 'long';
        default: return '90s';
      }
    } else {
      switch (value) {
        case 'short': return '30s';
        case 'medium': return '60s';
        case 'long': return '90s';
        default: return '90s';
      }
    }
 
  }

}
