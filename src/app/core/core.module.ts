import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { CoreRoutingModule } from './core-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderNavComponent,
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ],
  exports: [
    CoreRoutingModule,
    HeaderComponent,
    HeaderNavComponent,
  ]
})
export class CoreModule { }
