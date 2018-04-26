import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
