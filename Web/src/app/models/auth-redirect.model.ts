import { AuthRedirectType } from '../enums/auth-redirect-type.enum';
import { AccountModel } from './account.model';

export class AuthRedirectModel extends AccountModel {
  redirectType: AuthRedirectType;
}
