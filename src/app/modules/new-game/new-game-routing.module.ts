import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { NewGameComponent } from './containers/new-game/new-game.component';


const newGameRoutes: Routes = [
  { path: '', component: NewGameComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(newGameRoutes)
  ],
  exports: [RouterModule]
})
export class NewGameRoutingModule {}
