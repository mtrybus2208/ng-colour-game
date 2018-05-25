import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CoreRoutingModule } from './core-routing.module';
import {
  CustomRouterStateSerializer,
  GameEffects,
  RouterEffects,
  metaReducers,
  reducers
  } from './store';
import { HeaderComponent } from './components/header/header.component';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';
import { GameService } from './services/game.service';


export const COMPONENTS = [
  HeaderComponent,
  HeaderNavComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    BrowserAnimationsModule,
    CoreRoutingModule,
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Colour DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([GameEffects, RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    GameService,
  ],
  exports: [
    CoreRoutingModule,
    ...COMPONENTS,
  ]
})
export class CoreModule { }
