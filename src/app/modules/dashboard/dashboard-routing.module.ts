import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import * as fromDashboardQuards from './quards';


const dashboardRoutes: Routes = [
  { path: '', canActivate: [fromDashboardQuards.DashboarddGuard], component: DashboardComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
