import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockUIService {
  blockApp = new Subject<boolean>();
  mainBlockApp = new Subject<boolean>();

  blockTargets = [];

  constructor() {}

  lockAll(block: boolean) {
    this.blockApp.next(block);
  }

  mainLockAll(block: boolean) {
    this.mainBlockApp.next(block);
  }

}
