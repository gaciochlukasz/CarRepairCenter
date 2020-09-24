import { FormControl } from '@angular/forms';

export class PhoneValidation {
    static PhoneValid(form: FormControl) {
        const phone = form.value;
        const regex = /[0-9]{6,}$/;
        const valid = regex.test(phone);
        if (!valid) {
            return { WrongPhoneNumber: { valid: false } };
        }
    }
}
