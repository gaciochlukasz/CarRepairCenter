import { ClientModel } from '../client/client.model';
import { CarsModel } from '../client/cars.model';
import { RepairStatusEnum } from '../../enums/repair-status.enum.enum';
import { VisitCarCardModel } from './visit-car-card.model';
import { ServiceListModel } from './service-list.model';

export interface VisitRepairModel {
    id: number;
    clientId: number;
    client: ClientModel;
    carId: number;
    car: CarsModel;
    visitCarCardId: number;
    visitCarCard: VisitCarCardModel;
    description: string;
    status: RepairStatusEnum;
    services: ServiceListModel[];
}
