import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy, } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'new-game', loadChildren: './modules/new-game/new-game.module#NewGameModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: '**', redirectTo: 'new-game', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
