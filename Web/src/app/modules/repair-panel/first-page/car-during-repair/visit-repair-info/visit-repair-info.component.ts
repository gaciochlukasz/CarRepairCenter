import { Component, OnInit, Input } from '@angular/core';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { CarTypeEnum } from 'src/app/enums/car-type.enum';
import { FuelTypeEnum } from 'src/app/enums/fuel-type.enum';

@Component({
  selector: 'crc-visit-repair-info',
  templateUrl: './visit-repair-info.component.html',
  styleUrls: ['./visit-repair-info.component.scss']
})
export class VisitRepairInfoComponent implements OnInit {

  // @Input() visitInfo: VisitRepairModel;
  visit: VisitRepairModel;
  get visitinfo(): VisitRepairModel {
    return this.visit;
  }

  @Input('visitInfo')
  set visitInfo(value: VisitRepairModel) {
    this.visit = value;
    if (this.visit) {
      this.fuelType = this.getEnumValue(FuelTypeEnum, this.visit.car.fuelType);
      this.carType = this.getEnumValue(CarTypeEnum, this.visit.car.carType);
    }
  }

  carType: string;
  fuelType: string;
  constructor() { }

  ngOnInit() {

  }

  getEnumValue(enumType: any, typeNumber: number): string {
    const type = this.getKeys(enumType);
    let value = '';
    type.forEach(x => {
      // tslint:disable-next-line:triple-equals
      if (x.key == typeNumber) {
        value = x.value;
      }
    });
    return value;
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

}
