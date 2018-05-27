import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-wrapper {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      justify-content: space-between;
    }
    main {
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'Colour game';
}
