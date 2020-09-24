import { Component, OnInit } from '@angular/core';
import { BlockUIService } from 'src/app/services/block-ui.service';

@Component({
  selector: 'crc-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private blockUi: BlockUIService) { }

  ngOnInit() {
    this.blockUi.mainLockAll(false);
  }
}
