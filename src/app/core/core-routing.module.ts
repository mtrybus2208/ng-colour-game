import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy, } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'new-game', pathMatch: 'full' },
  { path: 'new-game', loadChildren: './../modules/new-game/new-game.module#NewGameModule' },
  { path: 'dashboard', loadChildren: './../modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'results', loadChildren: './../modules/results/results.module#ResultsModule' },
  { path: '**', redirectTo: 'new-game', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [],
})
export class CoreRoutingModule {}
