import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { NewGameRoutingModule } from './new-game-routing.module';
import { NewGameComponent } from './containers/new-game/new-game.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  entryComponents: [ AlertComponent ],
  declarations: [
    NewGameComponent,
    AlertComponent
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
