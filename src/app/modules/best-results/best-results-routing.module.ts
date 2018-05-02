import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BestResultsComponent } from './containers/best-results.component';


const dashboardRoutes: Routes = [
  { path: '', component: BestResultsComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class BestResultsRoutingModule {}
