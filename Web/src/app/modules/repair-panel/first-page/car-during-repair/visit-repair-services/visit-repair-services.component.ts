import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ServiceListModel } from 'src/app/models/visit-repair/service-list.model';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { VisitRepairService } from '../../../services/visit-repair.service';
import { AddVisitRepairServiceDialogComponent } from './add-visit-repair-service-dialog/add-visit-repair-service-dialog.component';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { RepairStatusEnum } from 'src/app/enums/repair-status.enum.enum';

@Component({
  selector: 'crc-visit-repair-services',
  templateUrl: './visit-repair-services.component.html',
  styleUrls: ['./visit-repair-services.component.scss']
})
export class VisitRepairServicesComponent implements OnInit {

  visitRepairId: number;
  repairStatusEnum = RepairStatusEnum;
  get visitId(): number {
    return this.visitRepairId;
  }

  @Input('visitId')
  set visitId(value: number) {
    this.visitRepairId = value;
    if (this.visitRepairId) {
      this.getServicesList();
    }
  }
  @Input() visitStatus: number;
  displayedColumns: string[] = ['service', 'servicePrice', 'partsPrice', 'done', 'action'];
  dataSource: MatTableDataSource<ServiceListModel>;
  cars: ServiceListModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private visitRepairService: VisitRepairService,
    private blockUi: BlockUIService,
    private infoMessageService: InfoMessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  getServicesList() {
    this.blockUi.lockAll(true);
    this.visitRepairService.getServicesList(this.visitRepairId).subscribe((services: ServiceListModel[]) => {
      this.cars = services;
      this.dataSource = new MatTableDataSource<ServiceListModel>(services);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas pobierania usług');
      this.blockUi.lockAll(false);
    });
  }

  changeServiceStatus(status: any, row: ServiceListModel) {
    this.blockUi.lockAll(true);
    row.done = status.checked;
    this.visitRepairService.editVisitRepairService(row).subscribe(() => {
      this.blockUi.lockAll(false);
      this.infoMessageService.openSuccessInfo('Poprawnie zmieniono status usługi');
      this.getServicesList();
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessageService.openErrorInfo('Błąd podczas zmiany statusu usługi');
    });
  }

  addService() {
    const dialogRef = this.dialog.open(AddVisitRepairServiceDialogComponent, {
      width: '25%',
      data: { visitRepairId: this.visitRepairId }
    });

    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.getServicesList();
      }
    });
  }

  editService(service: ServiceListModel) {
    const dialogRef = this.dialog.open(AddVisitRepairServiceDialogComponent, {
      width: '25%',
      data: { visitRepairId: this.visitRepairId, forEdit: service }
    });

    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.getServicesList();
      }
    });
  }

  deleteService(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '20%',
      data: { message: 'Czy na pewno chcesz usunąć usługę?', confirmTitle: 'Usuwanie usługi' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.blockUi.lockAll(true);
        this.visitRepairService.deleteVisitService(id, this.visitRepairId).subscribe((x) => {
          this.blockUi.lockAll(false);
          this.infoMessageService.openSuccessInfo('Poprawnie usunięto usługę');
          this.getServicesList();
        }, () => {
          this.blockUi.lockAll(false);
          this.infoMessageService.openErrorInfo('Błąd podczas usuwania usługi');
        });
      }
    });
  }
}
