import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', loadChildren: './components/welcome-page/welcome-page.module#WelcomePageModule' },
  { path: 'panel', loadChildren: './modules/repair-panel/repair-panel.module#RepairPanelModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
