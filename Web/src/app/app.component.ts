import { Component, OnInit } from '@angular/core';
import { BlockUIService } from './services/block-ui.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'crc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blockUI = false;
  mainBlockUI = true;

  resoult: string;

  get blockTargets() {
    return this.blockedUIService.blockTargets;
  }

  constructor(private blockedUIService: BlockUIService) { }

  ngOnInit() {
    this.blockedUIService.blockApp.subscribe(x => {
      setTimeout(() => {
        this.blockUI = x;
      }, 1);
    });
    this.blockedUIService.mainBlockApp.subscribe(x => {
      setTimeout(() => {
        this.mainBlockUI = x;
      }, 1);
    });
  }
}
