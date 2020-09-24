import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordValidation } from 'src/app/validators/password.validation';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { EmailValidation } from 'src/app/validators/email.validation';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private blockUI: BlockUIService,
    private infoMessageService: InfoMessageService,
    private router: Router) { }

  ngOnInit() {
    this.setFormConfig();
  }

  register() {
    if (!this.form.valid) {
      return;
    }
    this.blockUI.lockAll(true);
    const registerUser = this.form.value;

    this.authService.registerUser(registerUser).subscribe((x: boolean) => {
      this.blockUI.lockAll(false);
      this.router.navigate(['']);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas tworzenia konta');
      this.blockUI.lockAll(false);
      console.log('error');
    });
  }

  setFormConfig() {
    this.form = this.formBuilder.group({
      garageName: ['', { validators: [Validators.required] }],
      name: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, EmailValidation.EmailValid] }],
      password: ['', {
        validators: [Validators.required,
        PasswordValidation.ValidCharacters,
        PasswordValidation.ValidLowerCase,
        PasswordValidation.ValidUpperCase,
        PasswordValidation.ValidDigit,
        PasswordValidation.ValidSpecChar,
        PasswordValidation.ValidLen]
      }],
      passwordRepeat: ['', { validators: [] }]
    },
      { validator: PasswordValidation.MatchRegistrationPassword });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
