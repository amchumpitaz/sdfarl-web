import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
      this.toastr.success(message, title, { progressBar: true, closeButton: true });
  }

  showSuccessHtml(message: string, title: string) {
    this.toastr.success(message, title, { enableHtml: true, closeButton: true, timeOut: 6000, progressBar: true });
  }

  showSuccessLongHtml(message: string, title: string) {
    this.toastr.success(message, title, { enableHtml: true, closeButton: true, timeOut: 12000, progressBar: true });
  }

  showSuccessUnLimitTime(message: string, title: string) {
    this.toastr.success(message, title, { enableHtml: true, closeButton: true, disableTimeOut: true });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, { progressBar: true, closeButton: true });
  }

  showErrorHtml(message: string, title: string) {
    this.toastr.error(message, title, { enableHtml: true, closeButton: true, timeOut: 6000, progressBar: true });
  }

  showErrorLongHtml(message: string, title: string) {
    this.toastr.error(message, title, { enableHtml: true, closeButton: true, timeOut: 12000, progressBar: true });
  }

  showErrorUnLimitTime(message: string, title: string) {
    this.toastr.error(message, title, { enableHtml: true, closeButton: true, disableTimeOut: true });
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, { progressBar: true, closeButton: true });
  }

  hiddenNotification() {
    this.toastr.clear();
  }
}
