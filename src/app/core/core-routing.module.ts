import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy, } from '@angular/router';
import { DashboarddGuard } from './../modules/dashboard/quards/dashboard.quard';

const routes: Routes = [
  { path: '', redirectTo: 'new-game', pathMatch: 'full' },
  { path: 'new-game', loadChildren: './../modules/new-game/new-game.module#NewGameModule' },
  { path: 'dashboard',
  // canLoad: [DashboarddGuard],
  loadChildren: './../modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'results', loadChildren: './../modules/results/results.module#ResultsModule' },
  { path: 'best-results', loadChildren: './../modules/best-results/best-results.module#BestResultsModule' },
  { path: '**', redirectTo: '/new-game', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [],
})
export class CoreRoutingModule {}

