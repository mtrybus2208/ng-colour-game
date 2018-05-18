
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './containers/new-game/new-game.component';
import { NewGameFormComponent } from './components/new-game-form/new-game-form.component';
import { NewGameInfoComponent } from './components/new-game-form/new-game-info/new-game-info.component';

@NgModule({
  declarations: [
    NewGameComponent,
    NewGameFormComponent,
    NewGameInfoComponent
  ],
  imports: [
    SharedModule,
    NewGameRoutingModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class NewGameModule { }
