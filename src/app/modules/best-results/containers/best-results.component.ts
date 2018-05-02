import { Component } from '@angular/core';

@Component({
  selector: 'app-best-results',
  template: `
    <div class="best-results">
      <p>1. Janke</p>
      <p>2. Arek</p>
      <p>3. Edek</p>
      <p>4. Misia Kurwa</p>
    </div>
  `,
  styles: [`
    .best-results {
      background: #fff;
      max-width: 70%;
      padding-right: 1rem;
      padding-left: 1rem;
      margin-right: auto;
      margin-left: auto;
    }
  `]
})
export class BestResultsComponent { }
