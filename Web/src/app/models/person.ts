import { PersonTypeEnum } from '../enums/person-type.enum';

export interface PersonModel {
    id: number;
    garageId: number;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    active: boolean;
    personType: PersonTypeEnum;
}
