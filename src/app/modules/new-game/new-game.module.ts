
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './containers/new-game/new-game.component';

@NgModule({
  declarations: [
    NewGameComponent
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
