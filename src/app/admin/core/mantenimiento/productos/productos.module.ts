import { ProductosRoutingModule } from './productos-routing.module';
import { ModalService } from '../../../../shared/alert/modal.service';
import { AlertModule } from '../../../../shared/alert/alert.module';
import { PageHeaderModule } from '../../../../shared/modules/page-header/page-header.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosMantenimientoComponent } from './productos-mantenimiento/productos-mantenimiento.component';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    ProductosRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [/*ProductosComponent, ProductosMantenimientoComponent*/],
  providers: [DatePipe, ModalService]
})
export class UsuariosModule { }
