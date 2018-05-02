import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { BestResultsComponent } from './containers/best-results.component';
import { BestResultsRoutingModule } from './best-results-routing.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [
    BestResultsComponent
  ],
  imports: [
    CommonModule,
    BestResultsRoutingModule,
    SharedModule,
    MatButtonModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class BestResultsModule { }
