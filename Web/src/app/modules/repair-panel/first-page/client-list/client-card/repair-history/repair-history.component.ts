import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VisitRepairService } from 'src/app/modules/repair-panel/services/visit-repair.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { RepairStatusEnum } from 'src/app/enums/repair-status.enum.enum';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { PrintService } from 'src/app/modules/repair-panel/services/print.service';

@Component({
  selector: 'crc-repair-history',
  templateUrl: './repair-history.component.html',
  styleUrls: ['./repair-history.component.scss']
})
export class RepairHistoryComponent implements OnInit {

  @Input() clientId: number;
  public RepairStatusEnum = RepairStatusEnum;
  displayedColumns: string[] = ['carBrand', 'carName', 'registrationNo', 'visitDate', 'status', 'action'];
  dataSource: MatTableDataSource<VisitRepairModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private visitRepairService: VisitRepairService,
    private infoMessage: InfoMessageService,
    private blockUi: BlockUIService,
    private router: Router,
    private dialog: MatDialog,
    private printService: PrintService) { }

  ngOnInit() {
    this.blockUi.lockAll(true);
    this.getVisitHistory();
  }

  getVisitHistory() {
    this.visitRepairService.getRepairHistory(this.clientId).subscribe((visits: VisitRepairModel[]) => {
      this.dataSource = new MatTableDataSource<VisitRepairModel>(visits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUi.lockAll(false);
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessage.openErrorInfo('Błąd pobierania wizyt');
    });
  }

  goToVisit(id: number) {
    this.router.navigate([`panel/visit-repair/${id}`]);
  }

  goToVisitInfo(id: number) {
    this.router.navigate([`panel/visit-repair/${id}`]);
  }

  cancelVisitRepair(visitRepairId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '20%',
      data: { message: 'Czy na pewno chcesz anulować wizyte?', confirmTitle: 'Anulowanie wizyty' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blockUi.lockAll(true);
        this.visitRepairService.cancelVisitRepair(visitRepairId).subscribe((x: boolean) => {
          this.blockUi.lockAll(false);
          this.getVisitHistory();
          this.infoMessage.openSuccessInfo('Poprawnie anulowano wizytę');
        }, () => {
          this.blockUi.lockAll(false);
          this.infoMessage.openErrorInfo('Błąd podczas anulowania wizyty');
        });
      }
    });
  }

  openCarCard(visitRepairId: number) {
    this.blockUi.lockAll(true);
    this.visitRepairService.getCarCardPdf(visitRepairId).subscribe((pdf: string) => {
      this.printService.openDataAsPdf(pdf);
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd pobierania dokumentu');
      this.blockUi.lockAll(false);
    });
  }
}
