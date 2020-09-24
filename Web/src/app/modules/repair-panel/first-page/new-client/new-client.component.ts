import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ClientModel } from 'src/app/models/client/client.model';
import { ClientService } from '../../services/client.service';
import { EmailValidation } from 'src/app/validators/email.validation';
import { PhoneValidation } from 'src/app/validators/phone.validation';
import { PostCodeValidation } from 'src/app/validators/post-code.validation';
import { PeselValidation } from 'src/app/validators/pesel.validation';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crc-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  form: FormGroup;

  constructor(public formBuild: FormBuilder,
     private clientService: ClientService,
      private blockUi: BlockUIService,
      private infoMessageService: InfoMessageService,
      private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuild.group({
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      email: [''],
      pesel: ['', { validators: [Validators.required, PeselValidation.CheckPesel] }],
      birthDay: [{ value: '', validators: [Validators.required]}],
      country: ['', { validators: [Validators.required] }],
      postCode: ['', { validators: [Validators.required, PostCodeValidation.PostCodeValid] }],
      city: ['', { validators: [Validators.required] }],
      street: ['', { validators: [Validators.required] }],
      houseNo: ['', { validators: [Validators.required] }],
      flatNo: [''],
      phone: ['', { validators: [Validators.required, PhoneValidation.PhoneValid] }]
    });
  }
  resetForm(form: FormGroup) {
    (<any>Object).values(form.controls).forEach((control: AbstractControl) => {
      control.setValue('');
      control.markAsUntouched();
    });
  }

  addClient(toClientCard?: boolean) {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const client = this.form.value as ClientModel;

    this.clientService.createNewClient(client).subscribe((response: number) => {
      this.blockUi.lockAll(false);
      this.resetForm(this.form);
      this.infoMessageService.openSuccessInfo('Poprawnie utworzono klienta');
      this.router.navigate([`panel/client-card/${response}`]);
    }, () => {
      this.infoMessageService.openErrorInfo('Błąd podczas tworzenia klienta');
      this.blockUi.lockAll(false);
    });
  }

}
