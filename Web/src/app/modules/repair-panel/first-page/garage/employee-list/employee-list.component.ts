import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonModel } from 'src/app/models/person';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { GarageService } from '../../../services/garage.service';
import { PersonService } from '../../../services/person.service';
import { EditEmployeeDialogComponent } from './edit-employee-dialog/edit-employee-dialog.component';

@Component({
  selector: 'crc-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'active', 'action'];
  dataSource: MatTableDataSource<PersonModel>;
  employees: PersonModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private garageService: GarageService,
    private blockUi: BlockUIService,
    private infoMessageService: InfoMessageService,
    private personService: PersonService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.blockUi.lockAll(true);
    this.garageService.getEmployeesList().subscribe((employees: PersonModel[]) => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource<PersonModel>(employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas pobierania pracowników');
      this.blockUi.lockAll(false);
    });
  }

  changeEmployeeStatus(event, employee: PersonModel) {
    this.blockUi.lockAll(true);
    employee.active = event.checked;
    this.personService.changeEmployeeStatus(employee).subscribe(() => {
      this.blockUi.lockAll(false);
      this.infoMessageService.openSuccessInfo('Poprawnie zmieniono status pracownika');
      this.getEmployees();
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessageService.openErrorInfo('Błąd podczas zmiany statusu pracownika');
    });
  }

  editEmployee(employee: PersonModel) {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '25%',
      data: {employee: employee}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getEmployees();
      }
    });
  }
}
