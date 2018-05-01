import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div class="app-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .app-container {
      padding-right: 1rem;
      padding-left: 1rem;
      margin-right: auto;
      margin-left: auto;
    }
  `]
})
export class ContainerComponent { }
