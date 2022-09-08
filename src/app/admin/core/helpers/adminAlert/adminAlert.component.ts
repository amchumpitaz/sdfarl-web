import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminAlert',
  templateUrl: './adminAlert.component.html',
  styleUrls: ['./adminAlert.component.scss']
})
export class AdminAlertComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  public decline() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
