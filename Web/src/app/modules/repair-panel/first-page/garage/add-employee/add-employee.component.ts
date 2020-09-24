import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../../services/garage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { PasswordValidation } from 'src/app/validators/password.validation';
import { EmailValidation } from 'src/app/validators/email.validation';
import { PhoneValidation } from 'src/app/validators/phone.validation';
import { NewEmployeeModel } from 'src/app/models/new-employee.model';
import { ResponseApiModel } from 'src/app/models/response-api.model';
import { RestStatusCode } from 'src/app/enums/rest-status-code.enum';

@Component({
  selector: 'crc-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private garageService: GarageService,
    private formBuilder: FormBuilder,
    private infoMessage: InfoMessageService,
    private blockUi: BlockUIService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required]}],
      lastName: ['', {validators: [Validators.required]}],
      phoneNumber: ['', {validators: [Validators.required, PhoneValidation.PhoneValid]}],
      email: ['', {validators: [Validators.required, EmailValidation.EmailValid]}],
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

  addNewEmployee() {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const employee = this.form.value as NewEmployeeModel;

    this.garageService.createNewEmployee(employee).subscribe((x) => {
      this.blockUi.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie utworzono nowego pracownika.');
    }, (x) => {
      this.blockUi.lockAll(false);
      if (x.error.responseStatusCode === RestStatusCode.EmailExist) {
        this.infoMessage.openErrorInfo('Podany email istnieje w systemie. Proszę podać inny');
      } else {
        this.infoMessage.openErrorInfo('Błąd podczas tworzenia nowego pracownika.');
      }
    });
  }
}
