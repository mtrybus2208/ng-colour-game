import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';

@NgModule({
  declarations: [
    ResultsComponent,
    BestResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ResultsModule { }
