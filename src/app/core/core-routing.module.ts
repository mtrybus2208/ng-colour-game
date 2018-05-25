import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy, } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './../modules/new-game/new-game.module#NewGameModule', pathMatch: 'full' },
  { path: 'dashboard',
  loadChildren: './../modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'results', loadChildren: './../modules/results/results.module#ResultsModule' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [],
})
export class CoreRoutingModule {}

