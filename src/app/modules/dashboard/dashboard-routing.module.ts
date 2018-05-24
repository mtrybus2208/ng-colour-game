import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { GameGuard } from './../../core/quards/game.quard';

const dashboardRoutes: Routes = [
  { path: '', canActivate: [GameGuard], component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
