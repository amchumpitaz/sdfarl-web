import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthLoginInfo } from '../../../../shared/auth/login-info';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../shared/auth/auth.service';
import { TokenStorageService } from '../../../../shared/auth/token-storage.service';
import { Router } from '@angular/router';
import { Register } from './register.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { TIPO_PERSONA_NATURAL, TIPO_EMPRESA, ERROR_INPUTS_REGISTER, DEFAULT_NEW_REGISTER } from 'src/app/shared/constants/main.constants';
import { RegisterService } from './register.service';
import { NotificationService } from 'src/app/shared/services';
import { ReCaptcha2Component } from 'ngx-captcha';
import { NgbModalRef, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { Rol } from './rol';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  register: Register;
  registerForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any;
  submitted = false;
  ExistControlDB: Boolean;

  secretQuestion: any;
  bussinessTurn: any;
  countries: any;
  departments: any;
  provinces: any;
  districts: any;
  doctypesBuss: any;
  doctypesPers: any;

  private loginInfo: AuthLoginInfo;


  @ViewChild('captchaElem', { }) captchaElem: ReCaptcha2Component;

  modal: NgbModalRef;
  textModal: string;

  constructor(
      private translate: TranslateService,
      private formBuilder: FormBuilder,
      private serviceRegister: RegisterService,
      public notificationService: NotificationService,
      private modalService: NgbModal,
      public router: Router
      ) {
  }

  ngOnInit() {
    console.log(this.translate.getBrowserLang());
    console.log(this.translate.currentLang);
    // Setting by defaul type EMPRESA
    this.formValidateChange();
    // Setting Departamentos
    this.departments =  [{
      id: 1,
      descripcion: this.translate.instant('Lima')
      },
      {
      id: 2,
      descripcion: this.translate.instant('Bogotá')
      },
      {
      id: 3,
      descripcion: this.translate.instant('Sao Pablo')
      },
      {
      id: 4,
      descripcion: this.translate.instant('Buenos Aires')
      }];
    // Setting Provincias
    this.provinces =  [{
      id: 1,
      descripcion: this.translate.instant('Lima')
      },
      {
      id: 2,
      descripcion: this.translate.instant('Bogotá')
     },
     {
      id: 3,
      descripcion: this.translate.instant('Sao Pablo')
     },
     {
      id: 4,
      descripcion: this.translate.instant('Buenos Aires')
      }];
    // Setting Distritos
    this.districts =  [{
      id: 1,
      descripcion: this.translate.instant('Lima')
      },
      {
      id: 2,
      descripcion: this.translate.instant('Bogotá')
     },
     {
      id: 3,
      descripcion: this.translate.instant('Sao Pablo')
     },
     {
      id: 4,
      descripcion: this.translate.instant('Buenos Aires')
      }];
    // Setting Tipo de Documentos para Persona
    this.doctypesPers =  [{
      id: 1,
      descripcion: 'Masculino'
      },
      {
      id: 2,
      descripcion: 'Femenino'
     }];

     // Setting Roles
    this.roles = {
      codigo: 'USR',
      descripcion: 'Usuariode sistema'
    };
  }

  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  formValidateChange() {
    this.registerForm = this.formBuilder.group({
      tipoRegistro: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmaEmail: ['', [Validators.required, Validators.email]],
      confirmaPassword: ['', [Validators.required, Validators.minLength(6)]],
      nombrePerN: ['', Validators.required],
      apellidosPerNP: ['', Validators.required],
      apellidosPerNM: ['', Validators.required],
      fechanac: ['', Validators.required],
      tipoDocPerN: ['', Validators.required],
      nroDocPerN: ['', Validators.required],
      // telfPerN: ['', Validators.required],
      departamentoPerN: ['', Validators.required],
      provinciaPerN: ['', Validators.required],
      distritoPerN: ['', Validators.required],
      direccionPerN: ['', Validators.required]
      }, {
          validators: [MustMatch('email', 'confirmaEmail'),
                      MustMatch('password', 'confirmaPassword'),
                      this.validEmailExist('email')]
      });
      this.registerForm.get('tipoRegistro').setValue(TIPO_PERSONA_NATURAL);
      this.submitted = false;
  }

  onSubmit() {
    console.log(this.registerForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
      return;
    } else {
      this.register = new Register(null,
        this.registerForm.get('nroDocPerN').value,
        this.registerForm.get('nombrePerN').value,
        this.registerForm.get('apellidosPerNP').value,
        this.registerForm.get('apellidosPerNM').value,
        this.registerForm.get('tipoDocPerN').value,
        this.registerForm.get('fechanac').value,
        this.registerForm.get('distritoPerN').value,
        this.registerForm.get('provinciaPerN').value,
        this.registerForm.get('departamentoPerN').value,
        this.registerForm.get('direccionPerN').value,
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.roles);
      // Here go register service
      console.log(this.register);
      this.serviceRegister.createPerson(this.register).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/register/success']);
        }, (error) => {
          console.log(JSON.stringify(error, null, 2));
          this.notificationService.showError('Hubo un error al registrar los datos', '');
        }
      );
      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value);
    }
  }

  reloadPage() {
      window.location.reload();
  }

  systemRedirect() {
    this.router.navigate(['/login']);
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  validEmailExist(email: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[email];
      this.ExistControlDB = false;
      if (control.value !== '') {
        // this.serviceRegister.getValidEmailExist(DEFAULT_NEW_REGISTER, control.value.trim()).subscribe(
        //   (data) => {
        //     // We need valid if correo exist in service, this is for only test
        //     this.ExistControlDB = (data.correo === control.value.trim()) ? true : false;
        //     // set error on control if email already exist in DB
        //     if (control.errors === null) {
        //       if (this.ExistControlDB) {
        //         control.setErrors({ emailExist: true });
        //       } else {
        //         control.setErrors(null);
        //       }
        //     }
        //   });
      }
    };
  }

  mustTrue(acceptTC: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[acceptTC];
      if (control.errors === null) {
        if (control.value === true) {
          control.setErrors(null);
        } else {
          control.setErrors({ mustTrue: true });
        }
      }
    };
  }

  // Modal
  openModal(info: any) {
    this.modal = this.modalService.open(info, {size: 'lg'});
  }

  ocultarModal(): void {
    this.modal.close();
  }
}
