import { NgModule } from '@angular/core';
import { RepairPanelComponent } from './repair-panel.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { RepairPanelRoutesModule } from './repair-panel.routing.module';
import { DashboardComponent } from './first-page/dashboard/dashboard.component';
import { MechanicPanelComponent } from './first-page/mechanic-panel/mechanic-panel.component';
import { UserPanelComponent } from './first-page/mechanic-panel/user-panel/user-panel.component';
import { UserSettingsComponent } from './first-page/mechanic-panel/user-settings/user-settings.component';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { NewClientComponent } from './first-page/new-client/new-client.component';
import { ClientListComponent } from './first-page/client-list/client-list.component';
import { ClientCardComponent } from './first-page/client-list/client-card/client-card.component';
import { CarListComponent } from './first-page/client-list/client-card/car-list/car-list.component';
import { AddCarDialogComponent } from './first-page/client-list/client-card/car-list/add-car-dialog/add-car-dialog.component';
import { CarDuringRepairComponent } from './first-page/car-during-repair/car-during-repair.component';
import { VisitRepairDialogComponent } from './first-page/visit-repair-dialog/visit-repair-dialog.component';
import { RepairHistoryComponent } from './first-page/client-list/client-card/repair-history/repair-history.component';
import { VisitRepairInfoComponent } from './first-page/car-during-repair/visit-repair-info/visit-repair-info.component';
import { VisitRepairServicesComponent } from './first-page/car-during-repair/visit-repair-services/visit-repair-services.component';
// tslint:disable-next-line:max-line-length
import { AddVisitRepairServiceDialogComponent } from './first-page/car-during-repair/visit-repair-services/add-visit-repair-service-dialog/add-visit-repair-service-dialog.component';
import { GarageVisitsRepairListComponent } from './first-page/dashboard/garage-visits-repair-list/garage-visits-repair-list.component';
import { EmployeProfileComponent } from './first-page/employe-profile/employe-profile.component';
import { AddEmployeeComponent } from './first-page/garage/add-employee/add-employee.component';
import { EditGarageComponent } from './first-page/garage/edit-garage/edit-garage.component';
import { EmployeeListComponent } from './first-page/garage/employee-list/employee-list.component';
import { BossGuard } from 'src/app/guards/boss.guard';
import { EditEmployeeDialogComponent } from './first-page/garage/employee-list/edit-employee-dialog/edit-employee-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RepairPanelRoutesModule,
    SharedModule
  ],
  declarations: [
    RepairPanelComponent,
    FirstPageComponent,
    DashboardComponent,
    MechanicPanelComponent,
    UserPanelComponent,
    UserSettingsComponent,
    MenuComponent,
    NewClientComponent,
    ClientListComponent,
    ClientCardComponent,
    CarListComponent,
    AddCarDialogComponent,
    CarDuringRepairComponent,
    VisitRepairDialogComponent,
    RepairHistoryComponent,
    VisitRepairInfoComponent,
    VisitRepairServicesComponent,
    AddVisitRepairServiceDialogComponent,
    GarageVisitsRepairListComponent,
    EmployeProfileComponent,
    AddEmployeeComponent,
    EditGarageComponent,
    EmployeeListComponent,
    EditEmployeeDialogComponent
  ],
  entryComponents: [
    AddCarDialogComponent,
    VisitRepairDialogComponent,
    AddVisitRepairServiceDialogComponent,
    EditEmployeeDialogComponent
  ],
  providers: [
    BossGuard
  ]
})
export class RepairPanelModule { }
