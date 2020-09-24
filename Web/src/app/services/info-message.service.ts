import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InfoMessageService {

constructor(private snackBar: MatSnackBar) { }
openSuccessInfo (info: string) {
  this.snackBar.open(info, '', {
    duration: 5 * 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-green']
  });
}

openErrorInfo (info: string) {
  this.snackBar.open(info, '', {
    duration: 5 * 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-red']
  });
}
}
