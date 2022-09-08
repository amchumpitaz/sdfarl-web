import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { PageHeaderModule } from '../../../shared';
import { DatePipe } from '@angular/common';

import { AlertModule } from 'src/app/shared/alert/alert.module';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { RegisterComponent } from './register/register.component';
import { SuccessRegisterComponent } from './register/success-register/success-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogoRoutingModule,
    NgbModule,
    AlertModule,
    ScrollToModule.forRoot(),
    TranslateModule,
    NgImageSliderModule,
    OwlModule,
    NgxCaptchaModule
  ],
  declarations: [CatalogoComponent, RegisterComponent, SuccessRegisterComponent],
  providers: [DatePipe, ModalService]
})
export class CatalogoModule {}
