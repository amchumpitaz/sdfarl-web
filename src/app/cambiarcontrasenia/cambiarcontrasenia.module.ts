import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CambiarcontraseniaRoutingModule } from './cambiarcontrasenia-routing.module';
import { CambiarcontraseniaComponent } from './cambiarcontrasenia.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CambiarcontraseniaRoutingModule,
        FormsModule,
        ReactiveFormsModule],
    declarations: [CambiarcontraseniaComponent]
})
export class CambiarcontraseniaModule {}
