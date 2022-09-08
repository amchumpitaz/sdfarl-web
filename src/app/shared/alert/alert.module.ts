import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertComponent],
  entryComponents: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule { }
