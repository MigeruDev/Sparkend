import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FlightReportComponent } from '../../flight-report/flight-report.component';
import { UsaMapComponent} from '../../usa-map/usa-map.component';
import { DevsComponent } from '../../devs/devs.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule,
} from '@angular/material';

import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    HighchartsChartModule
  ],
  declarations: [
    DashboardComponent,
    FlightReportComponent,
    UsaMapComponent,
    DevsComponent,
  ],
  entryComponents: [UsaMapComponent],
  bootstrap: [UsaMapComponent],
  providers: []
})

export class AdminLayoutModule {}
