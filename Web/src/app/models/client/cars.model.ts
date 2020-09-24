import { FuelTypeEnum } from '../../enums/fuel-type.enum';
import { CarTypeEnum } from '../../enums/car-type.enum';

export interface CarsModel {
  id: number;
  carBrand: string;
  carName: string;
  registrationNo: string;
  vinNo: string;
  firstRegisterDate: string;
  nameOwner: string;
  peselOrRegonOwner: string;
  addressOwner: string;
  carWeight: string;
  engineCapacity: string;
  enginePower: string;
  clientId: number;
  fuelType: FuelTypeEnum;
  carType: CarTypeEnum;
}
