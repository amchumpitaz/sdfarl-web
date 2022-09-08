import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/entities/core/catalogo/register/register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthLoginInfo } from 'src/app/shared/auth/login-info';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { RegisterService } from 'src/app/entities/core/catalogo/register/register.service';
import { NotificationService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { TIPO_EMPRESA, TIPO_PERSONA_NATURAL, ERROR_INPUTS_REGISTER, DEFAULT_NEW_REGISTER, SUCCESS_SAVE_DATA } from 'src/app/shared/constants/main.constants';
import { Rol } from 'src/app/entities/core/catalogo/register/rol';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  register: Register;
  registerForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any;
  submitted = false;
  secretQuestion: any;
  bussinessTurn: any;
  countries: any;
  departments: any;
  provinces: any;
  districts: any;
  doctypesBuss: any;
  doctypesPers: any;
  ExistControlDB: Boolean;
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
    // Setting by defaul type PERSONA NATURAL (2)
    // tslint:disable-next-line: max-line-length
    this.register = new Register(null,
      'DNI',
      'Lincoln',
      'Ortega',
      'Rosales',
      'Masculino',
      new Date('12/12/1999'),
      'Lima',
      'Lima',
      'Lima',
      'Lima',
      'lincoln@gmail.com',
      'password',
      null);
    this.formValidateChange(2);
    console.log(this.register);
    // To set values in FORM to bind in view IN CASE PERSONA NATURAL
    // To parse Int --> use opertor '+' before variable
    this.registerForm.setValue({
        tipoRegistro: 2,
        email: this.register.email,
        password: this.register.password,
        confirmaEmail: this.register.email,
        confirmaPassword: this.register.password,
        nombrePerN: this.register.nombre,
        apellidosPerNP: this.register.apellidoPaterno,
        apellidosPerNM: this.register.apellidoMaterno,
        fechanac: this.register.fechaNacimiento,
        tipoDocPerN: this.register.sexo,
        nroDocPerN: this.register.dni,
        departamentoPerN: this.register.departamento,
        provinciaPerN: this.register.provincia,
        distritoPerN: this.register.distrito,
        direccionPerN: this.register.direccion,
        });
        this.registerForm.get('tipoRegistro').setValue(TIPO_PERSONA_NATURAL);
    // console.log(this.register);
    // console.log(+this.register.direccionPerN);
    // console.log(this.registerForm);
    // console.log(this.registerForm.get('direccionPerN').value);

    // Setting Paises
    this.countries =  [{
      id: 1,
      descripcion: 'Argentina'
      },
      {
      id: 2,
      descripcion: 'Perú'
      },
      {
        id: 3,
        descripcion: 'Colombia'
      },
      {
      id: 4,
      descripcion: 'Brazil'
      }];
    // Setting Departamentos
    this.departments =  [{
      id: 1,
      descripcion: 'Lima'
      },
      {
      id: 2,
      descripcion: 'Bogotá'
      },
      {
      id: 3,
      descripcion: 'Sao Pablo'
      },
      {
      id: 4,
      descripcion: 'Buenos Aires'
      }];
    // Setting Provincias
    this.provinces =  [{
      id: 1,
      descripcion: 'Lima'
      },
      {
      id: 2,
      descripcion: 'Bogotá'
      },
      {
        id: 3,
        descripcion: 'Sao Pablo'
      },
      {
      id: 4,
      descripcion: 'Buenos Aires'
      }];
    // Setting Distritos
    this.districts =  [{
      id: 1,
      descripcion: 'Lima'
      },
      {
      id: 2,
      descripcion: 'Bogotá'
     },
     {
      id: 3,
      descripcion: 'Sao Pablo'
     },
     {
      id: 4,
      descripcion: 'Buenos Aires'
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
    this.roles = [{
      codigo: 'USR',
      descripcion: 'Usuariode sistema'
    }];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  formValidateChange($event) {
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
      departamentoPerN: ['', Validators.required],
      provinciaPerN: ['', Validators.required],
      distritoPerN: ['', Validators.required],
      direccionPerN: ['', Validators.required]
      }, {
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
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.roles);
      // Here go register service
      console.log(this.register);
      this.serviceRegister.createPerson(this.register).subscribe(
        (data) => {
          console.log(data);
        }, (error) => {
          console.log(JSON.stringify(error, null, 2));
        }
      );
      this.notificationService.showSuccess(this.translate.instant(SUCCESS_SAVE_DATA), '');
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

}
