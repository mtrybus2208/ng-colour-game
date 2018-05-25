import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { DashboardGuard } from './quards/dashboard.quard';

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
  providers: [DashboardGuard],
  exports: [
  ]
})
export class DashboardModule { }
