import { PersonModel } from '../../../models/person';
import { GarageModel } from '../../../models/garage.model';

export interface PersonGarageModel extends PersonModel {
    garage: GarageModel;
}
