import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MestextoPipe } from './mestexto.pipe';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      MestextoPipe
   ],
   exports: [
      MestextoPipe
   ],
})
export class SharedPipesModule { }
