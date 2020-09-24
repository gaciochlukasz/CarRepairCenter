// third-party
import { Injectable } from '@angular/core';

// Services
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

@Injectable()
export class StorageService {
  constructor(public local: LocalStorageService, public session: SessionStorageService) {}

  clear() {
    const sessionGuid = this.session.getSessionGuid();
    localStorage.clear();
    sessionStorage.clear();
    this.session.setSessionGuid(sessionGuid);
  }
}
