import { AbstractControl, FormControl } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(form: AbstractControl) {
    const password = form.get('newPassword').value;
    const confirmPassword = form.get('confirmPassword').value;
    if (password !== confirmPassword) {
      form.get('confirmPassword').setErrors({ MatchPassword: true }, { emitEvent: true });
    } else {
      return null;
    }
  }

  static MatchRegistrationPassword(form: AbstractControl) {
    const password = form.get('password').value;
    const passwordRepeat = form.get('passwordRepeat').value;
    if (password !== passwordRepeat) {
      form.get('passwordRepeat').setErrors({ MatchPassword: true }, { emitEvent: true });
    } else {
      return null;
    }
  }

  static ValidCharacters(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(password);

    if (!isValid) {
      return { WrongPassword: { valid: false } };
    }
  }

  static ValidLowerCase(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^(?=.*[a-z]).+$/.test(password);

    if (!isValid) {
      return { LowerCase: { valid: false } };
    }
  }

  static ValidUpperCase(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^(?=.*[A-Z]).+$/.test(password);

    if (!isValid) {
      return { UpperCase: { valid: false } };
    }
  }

  static ValidDigit(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^(?=.*\d).+$/.test(password);

    if (!isValid) {
      return { Digit: { valid: false } };
    }
  }

  static ValidSpecChar(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^(?=.*[^\da-zA-Z]).+$/.test(password);

    if (!isValid) {
      return { SpecChar: { valid: false } };
    }
  }

  static ValidLen(passwordControl: FormControl) {
    const password = passwordControl.value;
    const isValid = /^.{6,}$/.test(password);

    if (!isValid) {
      return { Len: { valid: false } };
    }
  }
}
