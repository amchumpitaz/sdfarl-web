import { AdminAlertComponent } from './adminAlert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminAlertComponent],
  entryComponents: [AdminAlertComponent],
  exports: [AdminAlertComponent]
})
export class AdminAlertModule { }
