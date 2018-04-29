import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <h1>Alert {{type}}</h1>
  `,
})
export class AlertComponent {
  @Input() type: string = 'success';
}

