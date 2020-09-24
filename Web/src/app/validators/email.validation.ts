import { FormControl } from '@angular/forms';

export class EmailValidation {
    static EmailValid(form: FormControl) {
        const email = form.value;
        // tslint:disable-next-line:max-line-length
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = regex.test(email);
        if (!valid) {
            return { WrongEmail: { valid: false } };
        }
    }
}
