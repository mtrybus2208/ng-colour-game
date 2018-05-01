import { Component } from '@angular/core';

@Component({
  selector: 'app-board-header',
  template: `
    <div class="board-header">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent { }
