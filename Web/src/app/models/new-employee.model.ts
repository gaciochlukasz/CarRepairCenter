import { PersonTypeEnum } from '../enums/person-type.enum';

export interface NewEmployeeModel {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    personType: PersonTypeEnum;
}
