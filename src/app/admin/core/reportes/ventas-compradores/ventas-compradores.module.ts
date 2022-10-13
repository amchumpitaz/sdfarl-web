import { VentasCompradoresRoutingModule } from './ventas-compradores-routing.module';
import { ModalService } from '../../../../shared/alert/modal.service';
import { AlertModule } from '../../../../shared/alert/alert.module';
import { PageHeaderModule } from '../../../../shared/modules/page-header/page-header.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VentasCompradoresComponent } from './ventas-compradores.component';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    VentasCompradoresRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [VentasCompradoresComponent],
  providers: [DatePipe, ModalService]
})
export class TiempoPublicacionModule { }
