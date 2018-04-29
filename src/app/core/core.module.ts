import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './store';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';

export const COMPONENTS = [
  HeaderComponent,
  HeaderNavComponent,
];
@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CoreRoutingModule,
    CommonModule,
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Colour DevTools',
      logOnly: environment.production,
    }),
  ],
  providers: [
  ],
  exports: [
    CoreRoutingModule,
    ...COMPONENTS
  ]
})
export class CoreModule { }
