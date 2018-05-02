import { Component } from '@angular/core';

@Component({
  selector: 'app-board-body',
  template: `
    <div class="board-body">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./board-body.component.scss'],
})
export class BoardBodyComponent { }
