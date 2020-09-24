import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { CarsModel } from 'src/app/models/client/cars.model';
import { VisitCarCardModel } from 'src/app/models/visit-repair/visit-car-card.model';
import { VisitRepairModel } from 'src/app/models/visit-repair/visit-repair.model';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { VisitRepairService } from '../../services/visit-repair.service';
import { Router } from '@angular/router';
import { AddVisitRepairModel } from 'src/app/models/visit-repair/add-visit-repair.model';

@Component({
  selector: 'crc-visit-repair-dialog',
  templateUrl: './visit-repair-dialog.component.html',
  styleUrls: ['./visit-repair-dialog.component.scss']
})
export class VisitRepairDialogComponent implements OnInit {

  form: FormGroup;
  car: CarsModel;
  clientId: number;
  registrationDocument = false;
  ocDocument = false;
  keyLeft = false;
  testDriveConsent = false;
  usedPatrsReturn = false;

  constructor(
    public dialogRef: MatDialogRef<VisitRepairDialogComponent>,
    private formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private infoMessage: InfoMessageService,
    private blockUI: BlockUIService,
    private visitRepairService: VisitRepairService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.car = this.data.car;
    this.clientId = this.data.clientId;
  }

  initForm() {
    this.form = this.formBuild.group({
      acceptanceDate: [''],
      receiptDate: [''],
      mileage: ['', { validators: [Validators.required] }],
      estimateCost: [''],
      valuables: [''],
      faultDescription: [''],
      externalConditionDescription: ['']
    });
  }

  createVisitReapir(toVisit: boolean = false) {
    if (!this.form.valid) {
      return;
    }
    this.blockUI.lockAll(true);
    const carCard = this.form.value as VisitCarCardModel;
    carCard.acceptanceDate = new Date();
    carCard.keyLeft = this.keyLeft;
    carCard.ocDocument = this.ocDocument;
    carCard.registrationDocument = this.registrationDocument;
    carCard.testDriveConsent = this.testDriveConsent;
    carCard.usedPatrsReturn = this.usedPatrsReturn;
    const visitRepair = {clientId: this.clientId, carId: this.car.id} as VisitRepairModel;
    const toSend = {visitCarCard: carCard, visitRepair: visitRepair} as AddVisitRepairModel;

    this.visitRepairService.addVisitRepair(toSend, toVisit).subscribe((visitId: number) => {
      this.blockUI.lockAll(false);
      if (toVisit) {
        this.router.navigate([`panel/visit-repair/${visitId}`]);
      }
      this.dialogRef.close();
    }, () => {
      this.blockUI.lockAll(false);
      this.infoMessage.openErrorInfo('Błąd podczas towrzenia wizyty');
    });
  }
}
