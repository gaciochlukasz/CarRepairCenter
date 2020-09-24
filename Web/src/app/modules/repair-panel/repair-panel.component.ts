import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatButton } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlockUIService } from 'src/app/services/block-ui.service';

@Component({
  selector: 'crc-repair-panel',
  templateUrl: './repair-panel.component.html',
  styleUrls: ['./repair-panel.component.scss']
})
export class RepairPanelComponent implements OnInit {
  opened = true;
  constructor(private router: Router, public authService: AuthService, private blockUI: BlockUIService) { }

  ngOnInit() {
    this.blockUI.mainLockAll(false);
    this.authService.checkToken().subscribe();
  }

  showMenu(sidenav: MatSidenav, menuButton: MatButton) {
    sidenav.toggle();
    if (this.opened) {
      menuButton.color = 'primary';
    } else {
      menuButton.color = 'warn';
    }
  }

}
