import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from 'src/app/models/client/client.model';
import { Urls } from '../urls.model';
import { GarageRestService } from 'src/app/services/garage-rest.service';
import { CarsModel } from 'src/app/models/client/cars.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  actualClient: ClientModel;

  constructor(private rest: GarageRestService) { }

  createNewClient(client: ClientModel): Observable<typeof Urls.Client.createNewClient.type> {
    return this.rest.post(Urls.Client.createNewClient.url(), client);
  }

  getClients(): Observable<typeof Urls.Client.getClients.type> {
    return this.rest.get(Urls.Client.getClients.url());
  }

  getClientByID(id: number): Observable<typeof Urls.Client.getClientByID.type> {
    return this.rest.get(Urls.Client.getClientByID.url(id));
  }

  editClient(client: ClientModel): Observable<typeof Urls.Client.editClient.type> {
    return this.rest.post(Urls.Client.editClient.url, client);
  }

  getClientCars(clientId: number): Observable<typeof Urls.Client.getClientCars.type> {
    return this.rest.get(Urls.Client.getClientCars.url(clientId));
  }

  addClientCar(clientCar: CarsModel): Observable<typeof Urls.Client.addClientCar.type> {
    return this.rest.post(Urls.Client.addClientCar.url, clientCar);
  }

  editClientCar(car: CarsModel): Observable<typeof Urls.Client.editClientCar.type> {
    return this.rest.post(Urls.Client.editClientCar.url, car);
  }
}
