import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/entities/core/catalogo/register/register.service';
import { NotificationService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { AuthLoginInfo } from 'src/app/shared/auth/login-info';
import { MustMatch } from 'src/app/entities/core/catalogo/register/_helpers/must-match.validator';
import { ERROR_INPUTS_REGISTER, SUCCESS_SAVE_PASSWORD, SUCCESS_SAVE_SECRET_QUESTION, SUCCESS_SAVE_EMAIL } from 'src/app/shared/constants/main.constants';
import { Register } from 'src/app/entities/core/catalogo/register/register.model';

@Component({
  selector: 'app-cambiarcontrasenia',
  templateUrl: './cambiarcontrasenia.component.html',
  styleUrls: ['./cambiarcontrasenia.component.scss']
})
export class CambiarcontraseniaComponent implements OnInit {
  register: Register;
  updatePasswordForm: FormGroup;
  updateEmailForm: FormGroup;
  updateSecretQuestionForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  submittedUPF = false;
  submittedUEF = false;
  submittedUSQF = false;
  secretQuestion: any;
  ExistControlEmailDB: Boolean;
  ExistControlPasswordDB: Boolean;
  private loginInfo: AuthLoginInfo;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private serviceRegister: RegisterService,
    public notificationService: NotificationService,
    public router: Router
    ) {
}

  ngOnInit() {
    // Get Register from DB/Auth to this.register --this is only for test
    // this.register.registroid = 1;
    // tslint:disable-next-line: max-line-length
    // this.register = new Register(1, '1', 'lincoln.ortega@gmail.com', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    // Setting form validates
    this.formValidates();
    // Setting Secret Question
    this.secretQuestion =  [{
        id: 1,
        descripcion: '¿Cómo se llamaba tu primera mascota?'
      },
      {
        id: 2,
        descripcion: '¿Cuál es tu película favorita?'
      },
      {
        id: 3,
        descripcion: '¿Cuál es tu comida favorita?'
      },
      {
        id: 4,
        descripcion: '¿En qué ciudad naciste?'
      }];
  }

  formValidates() {
    // Form for Update EMAIL
    this.updateEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
      }, {
        // validators: [ this.validEmailExist('email')]
      });
    // Form for Update PASSWORD
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {
        validators: [MustMatch('newPassword', 'confirmNewPassword'),
                    this.validPassword('password')]
      });
    // Form for Update PREGUNTA SECRETA
    this.updateSecretQuestionForm = this.formBuilder.group({
      pregSec: ['', Validators.required],
      respSec: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f1() {
    return this.updateEmailForm.controls;
  }
  get f2() {
    return this.updatePasswordForm.controls;
  }
  get f3() {
    return this.updateSecretQuestionForm.controls;
  }

  onSubmit(tipoUpd: string) {
    console.log(this.updateEmailForm);
    console.log(this.updatePasswordForm);
    console.log(this.updateSecretQuestionForm);

    switch (tipoUpd) {
      case 'updSQ':
        this.submittedUSQF = true;
        // stop here if form is invalid
        if (this.updateSecretQuestionForm.invalid) {
          this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
          return;
        } else {
          // Here go to update service
          this.notificationService.showSuccess(this.translate.instant(SUCCESS_SAVE_SECRET_QUESTION), '');
          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateSecretQuestionForm.value));
          console.log(this.updateSecretQuestionForm.value);
        }
        break;
      case 'updEmail':
        this.submittedUEF = true;
        // stop here if form is invalid
        if (this.updateEmailForm.invalid) {
          this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
          return;
        } else {
          // Here go to update service
          this.notificationService.showSuccess(this.translate.instant(SUCCESS_SAVE_EMAIL), '');
          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.updateEmailForm.value));
          console.log(this.updateEmailForm.value);
        }
        break;
      case 'updPassw':
        this.submittedUPF = true;
        // stop here if form is invalid
        if (this.updatePasswordForm.invalid) {
          this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
          return;
        } else {
          // Here go to update service
          this.notificationService.showSuccess(this.translate.instant(SUCCESS_SAVE_PASSWORD), '');
          console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.updatePasswordForm.value));
          console.log(this.updatePasswordForm.value);
        }
        break;
    }
  }

  reloadPage() {
      window.location.reload();
  }

  systemRedirect() {
    this.router.navigate(['/login']);
  }

  // validEmailExist(email: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[email];
  //     this.ExistControlEmailDB = false;
  //     if (control.value !== '') {
  //       this.serviceRegister.getValidEmailExist(this.register.registroid, control.value.trim()).subscribe(
  //         (data) => {
  //           // We need validate in service if correo already exist with other register'id
  //           this.ExistControlEmailDB = (data.correo === control.value.trim()) ? true : false;
  //           // set error on control if email already exist in DB
  //           if (this.ExistControlEmailDB) {
  //             control.setErrors({ emailExist: true });
  //           } else {
  //             control.setErrors(null);
  //           }
  //         });
  //     }
  //   };
  // }

  validPassword(password: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      this.ExistControlPasswordDB = false;
      // Here we need macth password trough Service or Auth session
      this.ExistControlPasswordDB = control.value === '123456' ? false : true;

      if (this.ExistControlPasswordDB) {
        control.setErrors({ passwordCorrect : true });
      } else {
        control.setErrors(null);
      }
    };
  }

}
