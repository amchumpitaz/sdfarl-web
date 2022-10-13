import { ModalService } from './../../../shared/alert/modal.service';
import { PageHeaderModule } from './../../../shared/modules/page-header/page-header.module';
import { AlertModule } from './../../../shared/alert/alert.module';
import { HistorialRoutingModule } from './historial-routing.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HistorialComponent } from './historial.component';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    HistorialRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [HistorialComponent],
  providers: [DatePipe, ModalService]
})
export class HistorialModule { }
