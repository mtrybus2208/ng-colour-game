import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from './../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';
import { ResultsGuard } from './quards/result.quard';
import { BestResultsBoardComponent } from './components/best-results-board/best-results-board.component';
import { ResultItemComponent } from './components/result-item/result-item.component';
import { ResultsService } from './services/results.service';

import { reducers, effects } from './store';

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
    MatTabsModule,
    StoreModule.forFeature('results', reducers.results),
    EffectsModule.forFeature(effects),
  ],
  providers: [ResultsGuard, ResultsService],
  exports: [
  ]
})
export class ResultsModule { }
