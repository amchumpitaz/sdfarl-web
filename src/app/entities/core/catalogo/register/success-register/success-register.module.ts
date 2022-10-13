import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessRegisterRoutingModule } from './success-register-routing.module';
import { SuccessRegisterComponent } from './success-register.component';

@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      SuccessRegisterRoutingModule,
      FormsModule,
      ReactiveFormsModule
      ],
  declarations: [/*SuccessRegisterComponent*/]
})
export class RegisterModule { }
