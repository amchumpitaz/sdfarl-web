import { AlertComponent } from './alert.component';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

constructor(private modalService: NgbModal, config: NgbModalConfig) {
  config.backdrop = 'static';
  config.keyboard = false;
}

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Aceptar',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'lg'|'sm' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(AlertComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
