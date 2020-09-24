import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from 'src/app/modules/repair-panel/services/person.service';
import { InfoMessageService } from 'src/app/services/info-message.service';
import { PersonModel } from 'src/app/models/person';
import { BlockUIService } from 'src/app/services/block-ui.service';

@Component({
  selector: 'crc-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {

  form: FormGroup;
  employee: PersonModel;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    private formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private infoMessage: InfoMessageService,
    private personService: PersonService,
    private blockUi: BlockUIService) { }

  ngOnInit() {
    this.initForm();
    this.employee = this.data.employee;
    this.setForm();
  }

  initForm() {
    this.form = this.formBuild.group({
      name: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      phoneNumber: ['', { validators: [Validators.required] }]
    });
  }

  setForm() {
    this.form.get('name').setValue(this.employee.name);
    this.form.get('lastName').setValue(this.employee.lastName);
    this.form.get('phoneNumber').setValue(this.employee.phoneNumber);
  }

  editEmployee() {
    if (!this.form.valid) {
      return;
    }
    this.blockUi.lockAll(true);
    const employee = this.form.value as PersonModel;
    this.employee.name = employee.name;
    this.employee.lastName = employee.lastName;
    this.employee.phoneNumber = employee.phoneNumber;

    this.personService.editPersonProfile(this.employee).subscribe(() => {
      this.blockUi.lockAll(false);
      this.infoMessage.openSuccessInfo('Poprawnie edytowano profil pracownika');
      this.dialogRef.close(true);
    }, () => {
      this.blockUi.lockAll(false);
      this.infoMessage.openErrorInfo('Błąd podczas edycji profilu pracownika');
    });
  }

}
