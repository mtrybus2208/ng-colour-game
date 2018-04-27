import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './containers/results/results.component';

@NgModule({
  declarations: [
    ResultsComponent
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
