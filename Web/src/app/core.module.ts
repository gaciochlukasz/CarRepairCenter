import { NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';
import { FirstService } from './services/first.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { HelperService } from './services/helper.service';
import { RestService } from './services/rest.service';
import { SessionStorageService } from './services/session-storage.service';
import { StorageService } from './services/storage.service';
import { PersonService } from './modules/repair-panel/services/person.service';
import { GarageService } from './modules/repair-panel/services/garage.service';
import { BlockUIService } from './services/block-ui.service';
import { AuthGuard } from './guards/auth.guard';
import { GarageGuardService } from './modules/repair-panel/garage-panel.routing.guard.service';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ClientService } from './modules/repair-panel/services/client.service';
import { InfoMessageService } from './services/info-message.service';
import { VisitRepairService } from './modules/repair-panel/services/visit-repair.service';
import { registerLocaleData } from '@angular/common';
import localepl from '@angular/common/locales/pl';
import { PrintService } from './modules/repair-panel/services/print.service';

registerLocaleData(localepl);
// module przechowujący service i resource
@NgModule({
  imports: [HttpClientModule, BrowserAnimationsModule],
  exports: [HttpClientModule, BrowserAnimationsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pl' },
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    FirstService,
    AuthService,
    LocalStorageService,
    HelperService,
    RestService,
    SessionStorageService,
    StorageService,
    PersonService,
    GarageService,
    BlockUIService,
    AuthGuard,
    GarageGuardService,
    ClientService,
    InfoMessageService,
    VisitRepairService,
    PrintService
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
