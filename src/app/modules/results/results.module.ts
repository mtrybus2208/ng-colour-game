import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './../../shared/shared.module';


import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';
import { ResultsGuard } from './quards/result.quard';

@NgModule({
  declarations: [
    ResultsComponent,
    BestResultsComponent
  ],
  imports: [
    SharedModule,
    ResultsRoutingModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [ResultsGuard],
  exports: [
  ]
})
export class ResultsModule { }
