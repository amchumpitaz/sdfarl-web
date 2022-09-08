import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from './../../../../../shared/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { UsuarioService } from '../usuarios.service';
import { Usuario } from '../usuarios.model';
import { ERROR_INPUTS_REGISTER } from 'src/app/shared/constants/main.constants';

@Component({
  selector: 'app-usuarios-mantenimiento',
  templateUrl: './usuarios-mantenimiento.component.html',
  styleUrls: ['./usuarios-mantenimiento.component.scss']
})
export class UsuariosMantenimientoComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;
  isCleanField: boolean;

  perfiles: any;
  paises: any;
  tipodocumentos: any;
  ExistControlDB: boolean;

  model: Usuario = new Usuario();
  idUsuario: number;
  isNotNumber: boolean;
  title: string;
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    public notificationService: NotificationService,
    public router: Router,
    private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.perfiles = [{
      id: 1,
      nombre: 'Administrador'
    },
    {
      id: 2,
      nombre: 'Comprador'
    },
    {
      id: 3,
      nombre: 'Cobrador'
    }];

    this.paises = [{
      id: 1,
      nombre: 'Peru'
    },
    {
      id: 2,
      nombre: 'Colombia'
    },
    {
      id: 3,
      nombre: 'Ecuador'
    }];

    this.tipodocumentos = [{
      id: 1,
      nombre: 'DNI'
    },
    {
      id: 2,
      nombre: 'Carnet de Extranjeria'
    },
    {
      id: 3,
      nombre: 'Pasaporte'
    }];

    this.registerForm = this.formBuilder.group({
      usuarioid: [''],
      perfil: ['', Validators.required],
      pais: ['', Validators.required],
      empresa: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPatUsu: ['', Validators.required],
      apellidoMatUsu: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoDocumento: ['', Validators.required],
      nroDocumento: ['', Validators.required]
    }, {
        validators: [this.validEmailExist('email'),
        this.validTypeDocumentExist('nroDocumento', 'tipoDocumento')]
      });

    if (this.usuarioService.get() != null) {

      this.idUsuario = this.usuarioService.get();

      this.usuarioService.getUsuarioById(1).subscribe(
        (data) => {
          this.model = data;
          this.registerForm.setValue({
            usuarioid: 1,
            perfil: this.model.perfil,
            pais: this.model.pais,
            empresa: this.model.empresa,
            nombre: this.model.nombre,
            apellidoPatUsu: this.model.apellidopaterno,
            apellidoMatUsu: this.model.apellidomaterno,
            email: this.model.email,
            tipoDocumento: this.model.tipodocumento,
            nroDocumento: this.model.nrodocumento
          });
        });

      console.log(this.usuarioService.get());
      this.title = 'Actualizar';
    } else {
      this.title = 'Registrar';
    }
    this.submitted = false;
    this.isCleanField = false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log(this.registerForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
      return;
    } else {
      // Here go register service

      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value);
      this.limpiarCampos();
    }
    this.router.navigate(['/admin/usuarios']);
  }

  validTypeDocumentExist(nroDocumento: string, tipodocumento: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[nroDocumento];
      const value = control.value;

      const controlTipoDocumento = formGroup.controls[tipodocumento];
      const valueTipoDocumento = controlTipoDocumento.value;

      if (control.errors === null) {
        if (valueTipoDocumento === 'DNI' || valueTipoDocumento === 'Carnet de Extranjeria') {
          const valid = value.match('^[0-9]*$');
          if (valid == null) {
            control.setErrors({ isNotNumber: true });
          } else {
            control.setErrors(null);
          }
        }
      }
    };
  }

  validEmailExist(email: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[email];
      this.ExistControlDB = false;
      if (control.value !== '' && this.usuarioService.get() === undefined) {
        this.usuarioService.getValidEmailExist(0, control.value).subscribe(
          (data) => {
            // We need valid if correo exist in service, this is for only test
            this.ExistControlDB = (data.email === control.value) ? true : false;
            // set error on control if email already exist in DB
            if (control.errors === null) {
              if (this.ExistControlDB) {
                control.setErrors({ emailExist: true });
              } else {
                control.setErrors(null);
              }
            }
          });
      }
    };
  }

  limpiarCampos() {
    this.registerForm.reset();
    this.submitted = false;
    this.isCleanField = true;
    this.usuarioService.clear();
  }

  cancelarOperacion() {
    this.limpiarCampos();
    this.router.navigate(['admin/usuarios']);
  }

}
