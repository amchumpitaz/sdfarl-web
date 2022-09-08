import { ModalService } from '../../../../shared/alert/modal.service';
import { AlertModule } from '../../../../shared/alert/alert.module';
import { PageHeaderModule } from '../../../../shared/modules/page-header/page-header.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CargaRoutingModule } from './carga-routing.module';
import { CargaComponent } from './carga.component';
import { ProductosCargaComponent } from './productos-carga/productos-carga.component';
import { FotografiaCargaComponent } from './fotografias-carga/fotografia-carga.component';
import { DocTecnicosCargaComponent } from './docTecnicos-carga/docTecnicos-carga.component';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    CargaRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [CargaComponent, ProductosCargaComponent, FotografiaCargaComponent, DocTecnicosCargaComponent],
  providers: [DatePipe, ModalService, NgbModule, NgbModal, NgbModalConfig]
})
export class CargaModule { }
