import { FormControl } from '@angular/forms';

export class PeselValidation {
  static CheckPesel(peselControl: FormControl) {
    const pesel = peselControl.value;
    if (!PeselValidation.IsPeselCorrect(pesel)) {
      return { WrongPesel: { valid: false } };
    }
  }
  public static IsPeselCorrect(pesel) {
    const reg = /^[0-9]{11}$/;
    if (reg.test(pesel) === false) {
      return false;
    } else {
      const dig = ('' + pesel).split('');
      let kontrola =
        (1 * parseInt(dig[0], 10) +
          3 * parseInt(dig[1], 10) +
          7 * parseInt(dig[2], 10) +
          9 * parseInt(dig[3], 10) +
          1 * parseInt(dig[4], 10) +
          3 * parseInt(dig[5], 10) +
          7 * parseInt(dig[6], 10) +
          9 * parseInt(dig[7], 10) +
          1 * parseInt(dig[8], 10) +
          3 * parseInt(dig[9], 10)) %
        10;

      if (kontrola === 0) {
        kontrola = 10;
      }
      kontrola = 10 - kontrola;
      return parseInt(dig[10], 10) === kontrola;
    }
  }

  public static GetDate(pesel: string): Date {
    const t = pesel.split('').map(function(e) {
      return parseInt(e, 10);
    });
    let year = 1900 + 10 * t[0] + t[1];
    if (t[2] >= 2 && t[2] < 8) {
      year += 100 * Math.floor(t[2] / 2);
    }
    if (t[2] >= 8) {
      year -= 100;
    }
    const month = (t[2] % 2) * 10 + t[3];
    const day = 10 * t[4] + t[5];

    const full = new Date(year, month - 1, day);
    return full;
  }
}
