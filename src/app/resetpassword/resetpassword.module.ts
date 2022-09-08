import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ResetPasswordRoutingModule,
        FormsModule,
        ReactiveFormsModule
        ],
    declarations: [ResetpasswordComponent]
})
export class ResetPasswordModule {}
