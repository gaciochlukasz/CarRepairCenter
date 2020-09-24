import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VisitRepairService } from '../../../services/visit-repair.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crc-garage-visits-repair-list',
  templateUrl: './garage-visits-repair-list.component.html',
  styleUrls: ['./garage-visits-repair-list.component.scss']
})
export class GarageVisitsRepairListComponent implements OnInit {

  displayedColumns: string[] = ['carBrand', 'carModel', 'registrationNo', 'firstName', 'lastName', 'action'];
  dataSource: MatTableDataSource<VisitRepairModel>;
  visits: VisitRepairModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private visitRepairService: VisitRepairService,
    private blockUi: BlockUIService,
    private infoMessageService: InfoMessageService,
    private router: Router
  ) { }


  ngOnInit() {
    this.blockUi.lockAll(true);
    this.visitRepairService.getActiveVisitRepair().subscribe((visits: VisitRepairModel[]) => {
      this.visits = visits;
      this.dataSource = new MatTableDataSource<VisitRepairModel>(visits);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.blockUi.lockAll(false);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas pobierania wizyt');
      this.blockUi.lockAll(false);
    });
  }

  goToVisit(id: number) {
    this.router.navigate([`panel/visit-repair/${id}`]);
  }

}
