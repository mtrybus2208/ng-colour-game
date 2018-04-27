import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResultsComponent } from './containers/results/results.component';


const dashboardRoutes: Routes = [
  { path: '', component: ResultsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class ResultsRoutingModule {}
