import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app.routing.module';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
