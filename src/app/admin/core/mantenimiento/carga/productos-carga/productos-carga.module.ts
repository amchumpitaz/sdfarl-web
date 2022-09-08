import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosCargaRoutingModule } from './productos-carga-routing.module';
import { ProductosCargaComponent } from './productos-carga.component';
import { NgbModalConfig, NgbModal, NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';

@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      ProductosCargaRoutingModule,
      FormsModule,
      NgbModalModule,
      ReactiveFormsModule,
      NgbModule
      ],
  declarations: [ProductosCargaComponent],
  providers: [NgbModalConfig, NgbModal, ModalService],
  bootstrap: [ProductosCargaComponent],
  entryComponents: [NgbModalBackdrop]
})
export class ProductosCargaModule { }
