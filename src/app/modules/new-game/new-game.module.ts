import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './containers/new-game/new-game.component';

@NgModule({
  declarations: [
    NewGameComponent
  ],
  imports: [
    CommonModule,
    NewGameRoutingModule,
    MatButtonModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class NewGameModule { }
