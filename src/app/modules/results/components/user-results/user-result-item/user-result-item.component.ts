import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-result-item',
  template: `
    <div class="result-item">
      <span class="result-tile">
        <ng-content select="[name]"></ng-content>
      </span>
      <span class="result-tile">
        <ng-content select="[score]"></ng-content>
      </span>
    </div>
  `,
  styleUrls: ['./user-result-item.component.scss']
})
export class UserResultItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
