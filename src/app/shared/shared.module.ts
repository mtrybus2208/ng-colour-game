import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContainerComponent } from './components/container/container.component';
import { BoardComponent } from './components/board/board.component';
import { BoardHeaderComponent } from './components/board/board-header/board-header.component';

export const COMPONENTS = [
  ContainerComponent,
  BoardComponent,
  BoardHeaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
