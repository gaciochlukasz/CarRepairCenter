import { PersonModel } from 'src/app/models/person';
import { GarageModel } from 'src/app/models/garage.model';

export interface EmployeeGarageModel extends PersonModel {
  garage: GarageModel;
}
