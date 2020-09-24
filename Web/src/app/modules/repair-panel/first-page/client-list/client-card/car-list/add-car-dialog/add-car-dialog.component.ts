import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsModel } from 'src/app/models/client/cars.model';
import { ClientService } from 'src/app/modules/repair-panel/services/client.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { CarTypeEnum } from 'src/app/enums/car-type.enum';
import { FuelTypeEnum } from '../../../../../../../enums/fuel-type.enum';

@Component({
  selector: 'crc-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent implements OnInit {

  form: FormGroup;
  cartypeenum = CarTypeEnum;
  fuelTypeEnum = FuelTypeEnum;
  keysCarType = [];
  keysFuelType = [];
  forEdit = false;
  car: CarsModel;

  constructor(
    public dialogRef: MatDialogRef<AddCarDialogComponent>,
    private formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private infoMessage: InfoMessageService) { }

  ngOnInit() {
    this.forEdit = !!this.data.car;
    this.initForm();
    this.keysCarType = this.getKeys(this.cartypeenum);
    this.keysFuelType = this.getKeys(this.fuelTypeEnum);
    if (this.forEdit) {
      this.car = this.data.car;
      this.setValue();
    }
  }

  getKeys(enumType: any) {
    const keyValue = [];
    const keys = Object.keys(enumType).filter((value, index) => {
      return (index !== 0) && !isNaN(Number(value));
    });

    for (const k of keys) {
      keyValue.push({ key: k, value: enumType[k] });
    }
    return keyValue;
  }

  initForm() {
    this.form = this.formBuild.group({
      carBrand: ['', { validators: [Validators.required] }],
      carName: ['', { validators: [Validators.required] }],
      registrationNo: ['', { validators: [Validators.required] }],
      vinNo: ['', { validators: [Validators.required] }],
      firstRegisterDate: [{ value: '', validators: [Validators.required] }],
      nameOwner: ['', { validators: [Validators.required] }],
      peselOrRegonOwner: ['', { validators: [Validators.required] }],
      addressOwner: ['', { validators: [Validators.required] }],
      carWeight: ['', { validators: [Validators.required] }],
      engineCapacity: ['', { validators: [Validators.required] }],
      enginePower: ['', { validators: [Validators.required] }],
      fuelType: ['', { validators: [Validators.required] }],
      carType: ['', { validators: [Validators.required] }]
    });
  }

  setValue() {
    const fuelType = this.car.fuelType;
    this.form.get('carBrand').setValue(this.car.carBrand);
    this.form.get('carName').setValue(this.car.carName);
    this.form.get('registrationNo').setValue(this.car.registrationNo);
    this.form.get('vinNo').setValue(this.car.vinNo);
    this.form.get('firstRegisterDate').setValue(this.car.firstRegisterDate);
    this.form.get('nameOwner').setValue(this.car.nameOwner);
    this.form.get('peselOrRegonOwner').setValue(this.car.peselOrRegonOwner);
    this.form.get('addressOwner').setValue(this.car.addressOwner);
    this.form.get('carWeight').setValue(this.car.carWeight);
    this.form.get('engineCapacity').setValue(this.car.engineCapacity);
    this.form.get('enginePower').setValue(this.car.enginePower);
    this.form.get('fuelType').setValue(this.car.fuelType.toString());
    this.form.get('carType').setValue(this.car.carType.toString());
  }

  addCar() {
    if (!this.form.valid) {
      return;
    }
    const car = this.form.value as CarsModel;
    car.clientId = this.data.clientId;

    this.clientService.addClientCar(car).subscribe(() => {
      this.infoMessage.openSuccessInfo('Poprawnie dodano pojazd');
      this.dialogRef.close(true);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd podczas dodawania pojazdu');
    });
  }

  editCar() {
    if (!this.form.valid) {
      return;
    }
    const car = this.form.value as CarsModel;
    car.clientId = this.data.clientId;
    car.id = this.data.car.id;

    this.clientService.editClientCar(car).subscribe(() => {
      this.infoMessage.openSuccessInfo('Poprawnie edytowano pojazd');
      this.dialogRef.close(true);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd podczas dodawania pojazdu');
    });
  }
}
