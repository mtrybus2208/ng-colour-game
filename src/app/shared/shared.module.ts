import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './components/container/container.component';
import { BoardComponent } from './components/board/board.component';
import { BoardHeaderComponent } from './components/board/board-header/board-header.component';
import { BoardBodyComponent } from './components/board/board-body/board-body.component';

export const COMPONENTS = [
  ContainerComponent,
  BoardComponent,
  BoardHeaderComponent,
  BoardBodyComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
