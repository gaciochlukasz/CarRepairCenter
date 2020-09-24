import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageRouting } from './welcome-page.routing';
import { SharedModule } from 'src/app/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    WelcomePageRouting,
    SharedModule
  ],
  declarations: [WelcomePageComponent, LoginComponent, RegisterComponent]
})
export class WelcomePageModule { }
