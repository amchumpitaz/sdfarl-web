import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadotextoPipe } from './estadotexto.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        EstadotextoPipe
    ],
    exports: [
        EstadotextoPipe
    ],
})
export class AdminPipesModule { }
