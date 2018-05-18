import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatInputModule } from '@angular/material/input';
import { ResultsRoutingModule } from './results-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { ResultsComponent } from './containers/results/results.component';
import { BestResultsComponent } from './containers/best-results/best-results.component';
import { ResultsGuard } from './quards/result.quard';
import { BestResultsExistGuard } from './quards/best-results-exist.quard';
import { BestResultsBoardComponent } from './components/best-results-board/best-results-board.component';
import { ResultItemComponent } from './components/best-results-board/result-item/result-item.component';
import { ResultsService } from './services/results.service';

import { MapGameTimeToSecPipe } from './../../shared/pipes/mapGameTimeToSec.pipe';

import { reducers, effects } from './store';
import { UserResultsComponent } from './components/user-results/user-results.component';
import { UserScoreComponent } from './components/user-results/user-score/user-score.component';
import { AddResultFormComponent } from './components/user-results/add-result-form/add-result-form.component'; 

@NgModule({
  declarations: [
    ResultsComponent,
    BestResultsComponent,
    BestResultsBoardComponent,
    ResultItemComponent,
    UserResultsComponent,
    UserScoreComponent,
    AddResultFormComponent, 
  ],
  imports: [
    SharedModule,
    ResultsRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    StoreModule.forFeature('results', reducers.results),
    EffectsModule.forFeature(effects),
  ],
  providers: [ResultsGuard, BestResultsExistGuard, ResultsService, MapGameTimeToSecPipe],
  exports: [ ]
})
export class ResultsModule { }
