import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  horizontalPos: MatSnackBarHorizontalPosition = 'right';
  verticalPos: MatSnackBarVerticalPosition = 'top'

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Close', {

      duration,
      horizontalPosition: this.horizontalPos,
      verticalPosition: this.verticalPos
    });
  }
}
