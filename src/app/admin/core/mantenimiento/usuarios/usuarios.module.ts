import { AdminAlertModule } from './../../helpers/adminAlert/adminAlert.module';
import { ModalService } from './../../../../shared/alert/modal.service';
import { PageHeaderModule } from './../../../../shared/modules/page-header/page-header.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosMantenimientoComponent } from './usuarios-mantenimiento/usuarios-mantenimiento.component';

@NgModule({
  imports: [
    CommonModule,
    AdminAlertModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    UsuariosRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [UsuariosComponent, UsuariosMantenimientoComponent],
  providers: [DatePipe, ModalService],
  bootstrap: [UsuariosComponent]
})
export class UsuariosModule { }
