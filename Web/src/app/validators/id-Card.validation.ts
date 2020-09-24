import { FormControl } from '@angular/forms';
import { IdCardOrPassportValidation } from './id-card-or-passport.validation';

export class IdCardValidation {
  static checkIdCard(idCard: FormControl) {
    const idCardValue = idCard.value;
    if (!IdCardValidation.validateId(idCardValue)) {
      return { WrongIdCard: { valid: false } };
    }
  }

  public static validateId(value) {
    value = value.toUpperCase();
    const sum = [7, 3, 1, 9, 7, 3, 1, 7, 3];
    const reg = /^[A-Z]{3}[0-9]{6}$/;

    if (!reg.test(value)) {
      return false;
    }
    return IdCardOrPassportValidation.checkIdCardOrPassport(value, sum);
  }
}
