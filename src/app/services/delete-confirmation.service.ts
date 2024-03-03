import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteConfirmationService {
  private readonly _dialog = inject(MatDialog);

  confirm(message: string): Observable<boolean> {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { message },
    });

    return dialogRef.afterClosed();
  }
}
