import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FlightReportComponent } from '../../flight-report/flight-report.component';
import { UsaMapComponent } from '../../usa-map/usa-map.component';
import { DevsComponent } from '../../devs/devs.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'flight-report',   component: FlightReportComponent },
    { path: 'usa-map',     component: UsaMapComponent },
    { path: 'devs',  component: DevsComponent },
];
