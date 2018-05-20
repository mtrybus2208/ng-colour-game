import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './components/container/container.component';
import { BoardComponent } from './components/board/board.component';
import { BoardHeaderComponent } from './components/board/board-header/board-header.component';
import { BoardBodyComponent } from './components/board/board-body/board-body.component';
import { MapGameTimeToSecPipe } from './pipes/mapGameTimeToSec.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

export const COMPONENTS = [
  ContainerComponent,
  BoardComponent,
  BoardHeaderComponent,
  BoardBodyComponent,
  LoaderComponent,
];

export const PIPES = [
  MapGameTimeToSecPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...COMPONENTS,
    ...PIPES,
  ]
})
export class SharedModule { }
