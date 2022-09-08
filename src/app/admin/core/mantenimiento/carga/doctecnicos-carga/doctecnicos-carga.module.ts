import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocTecnicosCargaComponent } from './doctecnicos-carga.component';
import { DocTecnicosCargaRoutingModule } from './doctecnicos-carga-routing.module';

@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      DocTecnicosCargaRoutingModule,
      FormsModule,
      ReactiveFormsModule
      ],
  declarations: [DocTecnicosCargaComponent]
})
export class ProductosCargaModule { }
