import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ClientService } from '../../services/client.service';
import { ClientModel } from 'src/app/models/client/client.model';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];


@Component({
  selector: 'crc-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'pesel', 'phone', 'address', 'action'];
  dataSource: MatTableDataSource<ClientModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clientService: ClientService,
     private infoMessageService: InfoMessageService,
     private router: Router) {
  }

  ngOnInit() {
    this.clientService.getClients().subscribe((clients: ClientModel[]) => {
      this.dataSource = new MatTableDataSource<ClientModel>(clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas pobierania klientów');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clientCard(id: number) {
    this.router.navigate([`panel/client-card/${id}`]);
  }
}
