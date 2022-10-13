import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SuccessRegisterComponent } from './success-register/success-register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModalConfig, NgbModal, NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      RegisterRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgxCaptchaModule,
      NgbModule
      ],
  declarations: [/*RegisterComponent, SuccessRegisterComponent*/],
  providers: [NgbModalConfig, NgbModal, ModalService]/*,
  entryComponents: [NgbModalBackdrop]*/
})
export class RegisterModule { }
