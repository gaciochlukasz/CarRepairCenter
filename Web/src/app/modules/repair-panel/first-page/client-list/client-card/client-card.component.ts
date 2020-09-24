import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/app/models/client/client.model';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailValidation } from 'src/app/validators/email.validation';
import { PeselValidation } from 'src/app/validators/pesel.validation';
import { PostCodeValidation } from 'src/app/validators/post-code.validation';
import { PhoneValidation } from 'src/app/validators/phone.validation';
import { CarListComponent } from './car-list/car-list.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'crc-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  client: ClientModel;
  clientId: number;
  form: FormGroup;

  constructor(
    private clientService: ClientService,
    private activateRoute: ActivatedRoute,
    private infoMessage: InfoMessageService,
    private blockUi: BlockUIService,
    private formBuild: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
    this.blockUi.lockAll(true);
    this.activateRoute.params.subscribe((x) => {
      this.clientId = x.id;
      this.clientService.getClientByID(this.clientId).subscribe((client: ClientModel) => {
        this.client = client;
        this.blockUi.lockAll(false);
        this.setForm();
      }, () => {
        this.infoMessage.openErrorInfo('Błąd podczas pobierania danych klienta');
        this.blockUi.lockAll(false);
      });
    });
  }
  initForm() {
    this.form = this.formBuild.group({
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, EmailValidation.EmailValid] }],
      pesel: ['', { validators: [Validators.required, PeselValidation.CheckPesel] }],
      birthDay: [{ value: '', validators: [Validators.required]}],
      country: ['', { validators: [Validators.required] }],
      postCode: ['', { validators: [Validators.required, PostCodeValidation.PostCodeValid] }],
      city: ['', { validators: [Validators.required] }],
      street: ['', { validators: [Validators.required] }],
      houseNo: ['', { validators: [Validators.required] }],
      flatNo: ['', { validators: [Validators.required] }],
      phone: ['', { validators: [Validators.required, PhoneValidation.PhoneValid] }]
    });
  }

  setForm() {
    this.form.get('firstName').setValue(this.client.firstName);
    this.form.get('lastName').setValue(this.client.lastName);
    this.form.get('email').setValue(this.client.email);
    this.form.get('pesel').setValue(this.client.pesel);
    this.form.get('birthDay').setValue(this.client.birthDay);
    this.form.get('country').setValue(this.client.country);
    this.form.get('postCode').setValue(this.client.postCode);
    this.form.get('city').setValue(this.client.city);
    this.form.get('street').setValue(this.client.street);
    this.form.get('houseNo').setValue(this.client.houseNo);
    this.form.get('flatNo').setValue(this.client.flatNo);
    this.form.get('phone').setValue(this.client.phone);
  }

  updateClient() {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const client = this.form.value;
    client.id = this.client.id;
    this.clientService.editClient(client).subscribe((response: boolean) => {
      this.blockUi.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie zapisano dane klienta');
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessage.openErrorInfo('Błąd podczas edycji danych klienta');
    });
  }
}
