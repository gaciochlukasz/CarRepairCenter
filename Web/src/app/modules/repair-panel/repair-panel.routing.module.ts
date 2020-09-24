import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepairPanelComponent } from './repair-panel.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { MechanicPanelComponent } from './first-page/mechanic-panel/mechanic-panel.component';
import { DashboardComponent } from './first-page/dashboard/dashboard.component';
import { GarageGuardService } from './garage-panel.routing.guard.service';
import { NewClientComponent } from './first-page/new-client/new-client.component';
import { ClientListComponent } from './first-page/client-list/client-list.component';
import { ClientCardComponent } from './first-page/client-list/client-card/client-card.component';
import { CarDuringRepairComponent } from './first-page/car-during-repair/car-during-repair.component';
import { EmployeProfileComponent } from './first-page/employe-profile/employe-profile.component';
import { EditGarageComponent } from './first-page/garage/edit-garage/edit-garage.component';
import { AddEmployeeComponent } from './first-page/garage/add-employee/add-employee.component';
import { EmployeeListComponent } from './first-page/garage/employee-list/employee-list.component';
import { BossGuard } from 'src/app/guards/boss.guard';

const repairPanelRoutes: Routes = [
  {
    path: '',
    component: RepairPanelComponent,
    canActivate: [GarageGuardService],
    children: [
      {path: '', component: FirstPageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'new-client', component: NewClientComponent},
      {path: 'mechanic-panel', component: MechanicPanelComponent},
      {path: 'clients-list', component: ClientListComponent},
      {path: 'client-card/:id', component: ClientCardComponent},
      {path: 'visit-repair/:id', component: CarDuringRepairComponent},
      {path: 'employee-profile', component: EmployeProfileComponent},
      {path: 'garage-settings', component: EditGarageComponent, canActivate: [BossGuard]},
      {path: 'add-employee', component: AddEmployeeComponent, canActivate: [BossGuard]},
      {path: 'employee-list', component: EmployeeListComponent, canActivate: [BossGuard]}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(repairPanelRoutes)],
  exports: [RouterModule]
})
export class RepairPanelRoutesModule {}
