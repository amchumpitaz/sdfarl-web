import { PedidosRoutingModule } from './pedidos-routing.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AlertModule } from '../../../shared/alert/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared/modules/page-header/page-header.module';
import { ModalService } from '../../../shared/alert/modal.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    NgxChartsModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    PedidosRoutingModule,
    ScrollToModule.forRoot(),
  ],
  declarations: [
    // PedidosComponent
  ],
  providers: [DatePipe, ModalService]
})
export class PedidosModule { }
