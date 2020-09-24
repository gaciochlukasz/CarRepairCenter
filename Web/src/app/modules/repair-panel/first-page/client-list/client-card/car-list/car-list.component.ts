import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/modules/repair-panel/services/client.service';
import { CarsModel } from 'src/app/models/client/cars.model';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { VisitRepairDialogComponent } from '../../../visit-repair-dialog/visit-repair-dialog.component';

@Component({
  selector: 'crc-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  @Input() clientId: number;
  displayedColumns: string[] = ['carBrand', 'carName', 'registrationNo', 'vinNo', 'nameOwner', 'action'];
  dataSource: MatTableDataSource<CarsModel>;
  cars: CarsModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clientService: ClientService,
    private blockUi: BlockUIService,
    private infoMessageService: InfoMessageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.blockUi.lockAll(true);
    this.clientService.getClientCars(this.clientId).subscribe((cars: CarsModel[]) => {
      this.cars = cars;
      this.dataSource = new MatTableDataSource<CarsModel>(cars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas pobierania pojazdów');
      this.blockUi.lockAll(false);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '60%',
      data: {clientId: this.clientId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCars();
      }
    });
  }

  openDialogForEdit(car: CarsModel) {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '60%',
      data: {clientId: this.clientId, car: car}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCars();
      }
    });
  }

  addVisitRepair(car: CarsModel) {
    if (!car) {
      this.infoMessageService.openErrorInfo('Błąd dodawania wizyty');
      return;
    }

    const dialogRef = this.dialog.open(VisitRepairDialogComponent, {
      width: '80%',
      data: {clientId: this.clientId, car: car}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCars();
      }
    });
  }

}
