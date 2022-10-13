import { ModalService } from './../../../../shared/alert/modal.service';
import { AlertModule } from './../../../../shared/alert/alert.module';
import { PageHeaderModule } from './../../../../shared/modules/page-header/page-header.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductosConsultadosRoutingModule } from './productos-consultados-routing.module';
import { ProductosConsultadosComponent } from './productos-consultados.component';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    ProductosConsultadosRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [ProductosConsultadosComponent],
  providers: [DatePipe, ModalService]
})
export class ProductosConsultadosModule { }
