import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';


import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { DashboarddGuard } from './quards/dashboard.quard';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [ 
    DashboardRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [DashboarddGuard],
  exports: [
  ]
})
export class DashboardModule { }
