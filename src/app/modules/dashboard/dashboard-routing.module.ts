import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardGuard } from './quards/dashboard.quard';

const dashboardRoutes: Routes = [
  { path: '', canActivate: [DashboardGuard], component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
