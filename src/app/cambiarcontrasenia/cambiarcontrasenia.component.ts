import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MustMatch } from '../entities/core/catalogo/register/_helpers/must-match.validator';
import { AuthService } from '../shared/auth/auth.service';
import { NotificationService } from '../shared/services';
import {ChangePassword} from '../shared/auth/ChangePassword';

@Component({
  selector: 'app-cambiarcontrasenia',
  templateUrl: './cambiarcontrasenia.component.html',
  styleUrls: ['./cambiarcontrasenia.component.scss']
})
export class CambiarcontraseniaComponent implements OnInit {
  form: FormGroup;
  ExistControlPasswordDB: Boolean;
  hashRecover: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.hashRecover = route.snapshot.queryParams.recover;
    if (this.hashRecover === undefined) {
      this.router.navigate(['/access-denied']);
    } else {
      // authService.verifyHashRecover(this.hashRecover).subscribe(
      //   data => {
      //     if (data.type === 'ERROR') {
      //       this.router.navigate(['/access-denied']);
      //     }
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    }
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      },
      {
        validators: [MustMatch('newPassword', 'confirmNewPassword')]
      }
    );
  }

  onSubmit(changePassword: any) {
    const recover: ChangePassword = new ChangePassword();
    recover.newPassword = changePassword.newPassword;
    recover.hashRecover = this.hashRecover;
    // this.authService.changePassword(recover).subscribe(
    //   data => {
    //     if (data.type === 'SUCCESS') {
    //       this.notificationService.showSuccess(data.message, 'Cambio de Contraseña');
    //       this.router.navigate(['/login']);
    //     } else {
    //       this.notificationService.showError(data.message, 'Cambio de Contraseña');
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    console.log(changePassword);
  }

  get frm() {
    return this.form.controls;
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmNewPassword() {
    return this.form.get('confirmNewPassword');
  }
}
