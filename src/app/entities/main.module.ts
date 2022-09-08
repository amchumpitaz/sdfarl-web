import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main.routing.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NgImageSliderModule,
        NgxCaptchaModule
    ],
    declarations: [ MainComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [ NgxSpinnerModule ]
})
export class MainModule {}
