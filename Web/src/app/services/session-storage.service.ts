// third-party
import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  private readonly sessionGuid = 'sessionGuid';

  setSessionGuid(guid: string) {
    if (!guid) {
      sessionStorage.removeItem(this.sessionGuid);
      return;
    }

    sessionStorage.setItem(this.sessionGuid, guid);
  }

  getSessionGuid(): string {
    return sessionStorage.getItem(this.sessionGuid);
  }
}
