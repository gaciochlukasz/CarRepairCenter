import { FormControl } from '@angular/forms';

export class PostCodeValidation {
    static PostCodeValid(form: FormControl) {
        const code = form.value;
        const regex = /^[0-9]{2}-[0-9]{3}$/;
        const valid = regex.test(code);
        if (!valid) {
            return { WrongPhoneNumber: { valid: false } };
        }
    }
}
