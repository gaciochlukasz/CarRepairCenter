import { Identifiable } from './constraints/identifiable';
import { JwtModel } from './jwt.model';

export const enum AccountTypeModel {
  Unknown = 0,
  Boss = 1,
  Employee = 2
}

export class AccountModel implements Identifiable {
  id: number;
  authorizationToken: JwtModel;
  mainClaims: string;
}
