import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUIService } from 'src/app/services/block-ui.service';
import { VisitRepairService } from 'src/app/modules/repair-panel/services/visit-repair.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceListModel } from 'src/app/models/visit-repair/service-list.model';
import { InfoMessageService } from 'src/app/services/info-message.service';

@Component({
  selector: 'crc-add-visit-repair-service-dialog',
  templateUrl: './add-visit-repair-service-dialog.component.html',
  styleUrls: ['./add-visit-repair-service-dialog.component.scss']
})
export class AddVisitRepairServiceDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddVisitRepairServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private blockUI: BlockUIService,
    private visitRepairService: VisitRepairService,
    private formBuilder: FormBuilder,
    private infoMessage: InfoMessageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      service: ['', {validators: [ Validators.required ]}],
      servicePrice: ['', {validators: [Validators.required]}],
      partsPrice: ['', {validators: [Validators.required]}]
    });
    if (this.data.forEdit) {
      this.openForEdit();
    }
  }

  addService() {
    if (!this.form.valid) {
      return;
    }

    this.blockUI.lockAll(true);
    const service = this.form.value as ServiceListModel;
    service.visitRepairId = this.data.visitRepairId;

    this.visitRepairService.addVisitRepairService(service).subscribe((x) => {
      this.blockUI.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie dodano usługę');
      this.dialogRef.close(true);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd podczas dodawania usługi');
      this.blockUI.lockAll(false);
    });
  }

  openForEdit() {
    this.form.get('service').setValue(this.data.forEdit.service);
    this.form.get('servicePrice').setValue(this.data.forEdit.servicePrice);
    this.form.get('partsPrice').setValue(this.data.forEdit.partsPrice);
  }

  editService() {
    if (!this.form.valid) {
      return;
    }

    this.blockUI.lockAll(true);
    const service = this.form.value as ServiceListModel;
    service.visitRepairId = this.data.visitRepairId;
    service.done = this.data.forEdit.done;
    service.id = this.data.forEdit.id;

    this.visitRepairService.editVisitRepairService(service).subscribe((x) => {
      this.blockUI.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie edytowano usługę');
      this.dialogRef.close(true);
    }, () => {
      this.infoMessage.openErrorInfo('Błąd podczas edytowania usługi');
      this.blockUI.lockAll(false);
    });
  }
}
