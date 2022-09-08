import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotografiaCargaComponent } from './fotografia-carga.component';
import { FotografiaCargaRoutingModule } from './fotografia-carga-routing.module';

@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      FotografiaCargaRoutingModule,
      FormsModule,
      ReactiveFormsModule
      ],
  declarations: [FotografiaCargaComponent]
})
export class FotografiaCargaModule { }
