import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapGameTimeToSec'
})
export class MapGameTimeToSecPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
        case 'short': {
          return '30s';
        }
        case 'medium': {
          return '60s';
        }
        case 'long': {
          return '90s';
        }
        default:
          return '90s';
      }
  }

}
