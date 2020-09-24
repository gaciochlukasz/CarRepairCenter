import { Component, OnInit } from '@angular/core';
import { GarageModel } from 'src/app/models/garage.model';
import { GarageService } from '../../../services/garage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PhoneValidation } from 'src/app/validators/phone.validation';
import { NipValidation } from 'src/app/validators/nip.validation';

@Component({
  selector: 'crc-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.scss']
})
export class EditGarageComponent implements OnInit {

  garage: GarageModel;
  form: FormGroup;

  constructor(private garageService: GarageService,
    private formBuilder: FormBuilder,
    private blockUi: BlockUIService,
    private infoMessage: InfoMessageService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.garage = this.garageService.currentGarage;
    this.initForm();
    if (this.garage) {
      this.setForm();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', {validators: [Validators.required]}],
      country: ['', {validators: [Validators.required]}],
      city: ['', {validators: [Validators.required]}],
      street: ['', {validators: [Validators.required]}],
      nr: ['', {validators: [Validators.required]}],
      nip: ['', {validators: [Validators.required, NipValidation.CheckNip]}],
      regon: ['', {validators: [Validators.required]}],
      email: [''],
      phone: ['', {validators: [Validators.required, PhoneValidation.PhoneValid]}],
    });
  }

  setForm() {
    this.form.get('name').setValue(this.garage.name);
    this.form.get('country').setValue(this.garage.country);
    this.form.get('city').setValue(this.garage.city);
    this.form.get('nr').setValue(this.garage.nr);
    this.form.get('nip').setValue(this.garage.nip);
    this.form.get('street').setValue(this.garage.street);
    this.form.get('regon').setValue(this.garage.regon);
    this.form.get('email').setValue(this.garage.email);
    this.form.get('phone').setValue(this.garage.phone);
  }

  editGarage() {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const garage = this.form.value;
    garage.id = this.garage.id;
    this.garageService.editGarage(garage).subscribe((garageResp: GarageModel) => {
      this.garageService.setCurrentGarage(garageResp);
      this.blockUi.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie edytowano informacje o garażu');
    }, () => {
      this.blockUi.lockAll(true);
      this.infoMessage.openErrorInfo('Błąd podczas edycji informacji o garażu');
    });
  }

}
