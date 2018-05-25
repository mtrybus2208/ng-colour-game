import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';
import { UserResultsGuard } from './guards/userResults.quard';


const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'best', pathMatch: 'full' },
  { path: 'current', canActivate: [UserResultsGuard], component: ResultsComponent },
  { path: 'best', component: BestResultsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class ResultsRoutingModule {}
