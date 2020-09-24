import { Component, OnInit } from '@angular/core';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitRepairService } from '../../services/visit-repair.service';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
// tslint:disable-next-line:max-line-length
import { AddVisitRepairServiceDialogComponent } from './visit-repair-services/add-visit-repair-service-dialog/add-visit-repair-service-dialog.component';
import { RepairStatusEnum } from 'src/app/enums/repair-status.enum.enum';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'crc-car-during-repair',
  templateUrl: './car-during-repair.component.html',
  styleUrls: ['./car-during-repair.component.scss']
})
export class CarDuringRepairComponent implements OnInit {

  visitRepairId: number;
  visit: VisitRepairModel;
  description: string;
  tabIndex = 0;
  repairStatusEnum = RepairStatusEnum;

  constructor(private blockUi: BlockUIService,
    private activatedRoute: ActivatedRoute,
    private visitRepairService: VisitRepairService,
    private infoMessage: InfoMessageService,
    private dialog: MatDialog,
    private router: Router,
    private printService: PrintService) { }

  ngOnInit() {
    this.blockUi.lockAll(true);
    this.activatedRoute.params.subscribe((x) => {
      this.visitRepairId = x.id;
      this.visitRepairService.getVisitRepair(this.visitRepairId).subscribe((visit: VisitRepairModel) => {
        this.visit = visit;
        this.description = visit.description;
        this.blockUi.lockAll(false);
      }, () => {
        this.infoMessage.openErrorInfo('Błąd podczas pobierania danych wizyty');
        this.blockUi.lockAll(false);
      });
    });
  }

  tabChange(change: MatTabChangeEvent) {
    console.log(this.description, this.visit.description, this.description !== this.visit.description);
    if (this.tabIndex === 2 && change.index !== 2 && this.description !== this.visit.description) {
      this.visitRepairService.updateVisitRepairDesc(this.visitRepairId, this.description).subscribe((x) => {
        this.visit.description = this.description;
      }, () => {
        this.infoMessage.openErrorInfo('Błąd aktualizacji opisu ogólnego');
      });
    }
    this.tabIndex = change.index;
  }

  backToClientCard() {
    this.router.navigate([`panel/client-card/${this.visit.clientId}`]);
  }

  closeVisitRepair() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '20%',
      data: {
        message: 'Czy na pewno chcesz zakończyć wizytę? Nie będziesz mógł potem dokonać żadnych zmian.',
        confirmTitle: 'Zakończenie wizyty'
      }
    });

    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.blockUi.lockAll(true);
        this.visitRepairService.closeVisitRepair(this.visitRepairId).subscribe((x) => {
          this.blockUi.lockAll(false);
          this.infoMessage.openSuccessInfo('Poprawnie zakończono wizytę');
          this.router.navigate([`panel/client-card/${this.visit.clientId}`]);
        }, () => {
          this.blockUi.lockAll(false);
          this.infoMessage.openErrorInfo('Błąd podczas kończenia wizyty. Spróbuj ponownie później.');
        });
      }
    });
  }

  printCarCard() {
    this.blockUi.lockAll(true);
    this.visitRepairService.getCarCardPdf(this.visitRepairId).subscribe((pdf: string) => {
      this.printService.openDataAsPdf(pdf);
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd pobierania dokumentu');
      this.blockUi.lockAll(false);
    });
  }
}
