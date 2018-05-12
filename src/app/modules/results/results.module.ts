import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './../../shared/shared.module';


import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';
import { ResultsGuard } from './quards/result.quard';
import { BestResultsBoardComponent } from './components/best-results-board/best-results-board.component';
import { ResultItemComponent } from './components/result-item/result-item.component';

@NgModule({
  declarations: [
    ResultsComponent,
    BestResultsComponent,
    BestResultsBoardComponent,
    ResultItemComponent
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
