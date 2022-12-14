import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { ERROR_INPUTS_REGISTER } from 'src/app/shared/constants/main.constants';
import { NotificationService } from 'src/app/shared/services';
import { MisPedidosService } from '../../../mispedidos/mispedidos.service';
import { Usuario } from '../../usuarios/usuarios.model';
import { UsuarioService } from '../../usuarios/usuarios.service';

@Component({
  selector: 'app-movimientos-mantenimiento-pendientes',
  templateUrl: './movimientos-mantenimiento-pendientes.component.html',
  styleUrls: ['./movimientos-mantenimiento-pendientes.component.scss']
})
export class MovimientosMantenimientoPendientesComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;
  isCleanField: boolean;

  body: any;
  perfiles: any;
  paises: any;
  tipodocumentos: any;
  ExistControlDB: boolean;

  model: Usuario = new Usuario();
  idUsuario: number;
  isNotNumber: boolean;
  title: string;

  aduanas: any;
  modalidad: any;
  paisorigen: any;
  capitulo: any;
  regimen: any;
  aduanaingresoegreso: any;
  codigobanco: any;
  paisprocedencia: any;
  agenteaduana: any;
  tecnologias: any;
  lugarrecojos: any;
  tipoMonedas: any;
  condicions: any;
  esfraudelist: any;

  incidencia: any;

  asignacion: any;
  operadores: any;
  bodyOp: any;

  casoFraude: any;
  id_movimiento: any;
  textModal: any;
  textModalProcess: any;
  catRiesgo: any;
  nivelDeRiesgo: any;
  lstNivelDeRiesgo: any;

  prob_riesgo: any;
  cat_riesgo: any;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    public notificationService: NotificationService,
    private misPedidosService: MisPedidosService,
    public router: Router,
    private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.obtenerOperadores();

    this.esfraudelist = [{
      nombre: 'SI'
    }, {
      nombre: 'NO'
    }];

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
      modalidad: [''],
      aduana: [''],
      importador: [''],
      bultos: [''],
      pesoneto: [''],
      pesobruto: [''],
      paisorigen: [''],
      capitulo: [''],
      partidaarancelaria: [''],
      subpartidaarancelaria: [''],
      partidaregional: [''],
      aperturanacional: [''],
      regimen: [''],
      aduanaingresoegreso: [''],
      codigobanco: [''],
      paisprocedencia: [''],
      seguroitem: [''],
      valoraduanausd: [''],
      agenteaduana: [''],
      valortotaladuanausd: [''],
      esfraude: ['']
    });

    if (this.usuarioService.get() != null) {
      this.id_movimiento = this.usuarioService.get();
      this.idUsuario = this.usuarioService.get();

      this.body = {'movimiento' : this.idUsuario};
      this.misPedidosService.getmovimientoAsignado(this.body).subscribe(
        (data) => {
          console.log(data);
          this.model = data.movimiento[0];
          console.log(this.model);
          this.registerForm.setValue({
            modalidad: this.model['modalidad_asociada_al_regimen'],
            aduana: this.model['aduana'],
            importador: this.model['impo_expo'],
            bultos: this.model['cantidad_de_bultos_linea'],
            pesoneto: this.model['peso_neto_item'],
            pesobruto: this.model['peso_bruto_item'],
            paisorigen: this.model['pais_origen'],
            capitulo: this.model['capitulo_2'],
            partidaarancelaria: this.model['partida_arancelaria_4'],
            subpartidaarancelaria: this.model['subpartida_arancelaria_6'],
            partidaregional: this.model['partida_regional'],
            aperturanacional: this.model['apertura_nacional_12'],
            regimen: this.model['regimen'],
            aduanaingresoegreso: this.model['aduana_ingreso_egreso'],
            codigobanco: this.model['codigo_banco'],
            paisprocedencia: this.model['pais_procedencia'],
            seguroitem: this.model['seguro_item'],
            valoraduanausd: this.model['valor_en_aduanas_sin_ajuste_en_usd_linea'],
            agenteaduana: this.model['agente_de_aduanas'],
            valortotaladuanausd: this.model['total_valor_en_aduana_usd'],
            esfraude: this.model['es_fraude']
          });
          // this.catRiesgo = (Math.round(parseFloat(this.model['probabilidad']) * 100) / 100) * 100;

          this.catRiesgo = (parseFloat(this.model['probabilidad']) * 100).toFixed(2);
          this.nivelDeRiesgo = (this.catRiesgo < 40) ? 1 : (this.catRiesgo < 60) ? 2 : 3;

          this.prob_riesgo = this.catRiesgo;
          this.cat_riesgo = this.nivelDeRiesgo;
          // Llamar a los controles
          this.cargarControlPorNiveldeRiesgo(this.nivelDeRiesgo);
        }
      );

      console.log(this.usuarioService.get());
      this.title = 'Actualizar';
    } else {
      this.title = 'Registrar';
    }
    this.submitted = false;
    this.isCleanField = false;
    this.loadData();
  }

  loadData() {
    this.aduanas = [{
      id: 0,
      descripcion: 'Santamar??a'
    },
    {
      id: 0.1,
      descripcion: 'Paso Canoas'
    },
    {
      id: 0.2,
      descripcion: 'La Anexi??n'
    },
    {
      id: 0.3,
      descripcion: 'Caldera'
    },
    {
      id: 0.66666667,
      descripcion: 'Lim??n'
    },
    {
      id: 1.,
      descripcion: 'Pe??as Blancas'
    },
    {
      id: 1.1,
      descripcion: 'Aduana Central'
    }];

    // Condicions for test
    this.condicions = [{
      id: '1',
      descripcion: 'Santamar??a'
    },
    {
      id: '2',
      descripcion: 'Paso Canoas'
    },
    {
      id: '0.66666667',
      descripcion: 'La Anexi??n'
    },
    {
      id: '0.66',
      descripcion: 'Caldera'
    },
    {
      id: '0.1',
      descripcion: 'Lim??n'
    },
    {
      id: '0',
      descripcion: 'Pe??as Blancas'
    },
    {
      id: '0.2',
      descripcion: 'Aduana Central'
    }];

    // modalidad for test
    this.modalidad = [{
      id: '0',
      descripcion: 'Importaci??n para el Consumo'
    },
    {
      id: '0.1',
      descripcion: 'Admisi??n Temporal para Reexportaci??n en el Mismo Estado'
    },
    {
      id: '0.4',
      descripcion: 'Admisi??n Temporal para Perfeccionamiento Activo'
    },
    {
      id: '0.28571429',
      descripcion: 'Reimportaci??n en el mismo estado'
    },
    {
      id: '0.285',
      descripcion: 'Deposito Aduanero'
    },
    {
      id: '0.2857',
      descripcion: 'Tr??nsito aduanero'
    },
    {
      id: '1',
      descripcion: 'Reembarque'
    }];

    // pais origen for test
    this.paisorigen = [{
      id: '0.12755102',
      descripcion: 'Costa Rica'
    },
    {
      id: '0.5127551',
      descripcion: 'El Salvador'
    },
    {
      id: '0.97193878',
      descripcion: 'Per??'
    },
    {
      id: '0.82653061',
      descripcion: 'Nicaragua'
    },
    {
      id: '0.54591837',
      descripcion: 'M??xico'
    },
    {
      id: '0.24744898',
      descripcion: 'Honduras'
    },
    {
      id: '0.12755102',
      descripcion: 'Cuba'
    }];

    this.capitulo = [{
      id: '0.39772727',
      descripcion: 'M??quinas y aparatos de clasificar, cribar, separar, lavar'
    },
    {
      id: '0.01136364',
      descripcion: 'Tractores'
    },
    {
      id: '0.97193878',
      descripcion: 'Carne de la especie bovina, deshuesada, fresca o refigerada'
    },
    {
      id: '0.88636364',
      descripcion: ' Harina y polvos comestibles, de carne o de despojos de reptiles'
    },
    {
      id: '0.98863636',
      descripcion: 'Cueros y pieles de reptil, curtidos o crust, incluso divididos pero sin otra preparaci??n'
    },
    {
      id: '0.36363636',
      descripcion: 'Placas y hojas de vidrio, armadas, incluso con capa absorbente'
    },
    {
      id: '0.784090909',
      descripcion: 'Bombas para distribuci??n de carburantes o lubricantes'
    }];

  // Tecnologias for test
    this.tecnologias = [{
      id: 1,
      descripcion: 'Tecnolog??a 1'
    },
    {
      id: 2,
      descripcion: 'Tecnolog??a 2'
    },
    {
      id: 3,
      descripcion: 'Tecnolog??a 3'
    }];

    // Lugar de Recojo for test
    this.lugarrecojos = [{
      id: 1,
      descripcion: 'Lugar Recojo 1'
    },
    {
      id: 2,
      descripcion: 'Lugar Recojo 2'
    },
    {
      id: 3,
      descripcion: 'Lugar Recojo 3'
    }];

    // Tipo Moneda for test
    this.tipoMonedas = [{
      id: '1',
      descripcion: 'SOL'
    },
    {
      id: '2',
      descripcion: 'DOL'
    },
    {
      id: '3',
      descripcion: 'EUR'
    }];

    this.regimen = [{
      id: '0',
      descripcion: 'Aduanero'
    }];

  this.aduanaingresoegreso = [
    {
      id: '0.42857143',
      descripcion: 'Caldera'
    },
    {
      id: '0.57142857',
      descripcion: 'Lim??n'
    },
    {
      id: '1',
      descripcion: 'Pe??as Blancas'
    },
    {
      id: '0',
      descripcion: 'Aduana Central'
    }];

    this.agenteaduana = [
      {
        id: '1.59856326e-01',
        descripcion: 'Velcon'
      },
      {
        id: '2.03494333e-02',
        descripcion: 'Fedex'
      },
      {
        id: '7.65613292e-03',
        descripcion: 'Sizou'
      },
      {
        id: '0.210576275',
        descripcion: 'FastNet'
      }];

    this.codigobanco = [
      {
        id: '0.04' ,
        descripcion: '0.04'
      },
      {
        id: '0',
        descripcion: '0.0'
      },
      {
        id: '0.98',
        descripcion: '0.98'
      },
      {
        id: '0.421',
        descripcion: '0.42'
      },
      {
        id: '0.1',
        descripcion: '0.1'
      }];

      this.paisprocedencia = [{
        id: '1',
        descripcion: 'Costa Rica'
      },
      {
        id: '0.24744898',
        descripcion: 'El Salvador'
      },
      {
        id: '0',
        descripcion: 'Per??'
      },
      {
        id: '0.68239796',
        descripcion: 'Nicaragua'
      },
      {
        id: '0.12755102',
        descripcion: 'M??xico'
      }];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  // onSubmit() {
  //   console.log(this.registerForm);
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.registerForm.invalid) {
  //     this.notificationService.showError(this.translate.instant(ERROR_INPUTS_REGISTER), '');
  //     return;
  //   } else {
  //     // Here go register service

  //     this.incidencia = new Array(
  //       this.idUsuario,
  //       parseFloat(this.registerForm.get('modalidad').value),
  //       parseFloat(this.registerForm.get('aduana').value),
  //       parseFloat(this.registerForm.get('importador').value),
  //       parseFloat(this.registerForm.get('bultos').value),
  //       parseFloat(this.registerForm.get('pesoneto').value),
  //       parseFloat(this.registerForm.get('pesobruto').value),
  //       parseFloat(this.registerForm.get('paisorigen').value),
  //       parseFloat(this.registerForm.get('capitulo').value),
  //       parseFloat(this.registerForm.get('partidaarancelaria').value),
  //       parseFloat(this.registerForm.get('subpartidaarancelaria').value),
  //       parseFloat(this.registerForm.get('partidaregional').value),
  //       parseFloat(this.registerForm.get('aperturanacional').value),
  //       parseFloat(this.registerForm.get('regimen').value),
  //       parseFloat(this.registerForm.get('aduanaingresoegreso').value),
  //       parseFloat(this.registerForm.get('codigobanco').value),
  //       parseFloat(this.registerForm.get('paisprocedencia').value),
  //       parseFloat(this.registerForm.get('seguroitem').value),
  //       parseFloat(this.registerForm.get('valoraduanausd').value),
  //       parseFloat(this.registerForm.get('agenteaduana').value),
  //       parseFloat(this.registerForm.get('valortotaladuanausd').value),
  //       this.registerForm.get('esfraude').value);
  //     // Here go register service
  //     console.log(this.incidencia);
  //     this.misPedidosService.updateIncidencia(this.incidencia).subscribe(
  //       (data) => {
  //         console.log(data);
  //         // console.log(data['predictions']['predictions'][0]);
  //         // document.getElementById('buttonOpenModal').click();
  //         // this.textModal = data['predictions']['predictions'][0];
  //         // this.textModal = (Math.round(this.textModal * 100) / 100) * 100;
  //         // this.casoFraude = (this.textModal < 40) ? 0 : (this.textModal < 60) ? 1 : 2;
  //         // this.id_movimiento = data['movimiento'];
  //         // console.log(data['predictions']['predictions'][0]);
  //         // console.log(this.textModal);
  //         // console.log(this.casoFraude);
  //         this.notificationService.showSuccess('Se actualiz?? el movimiento aduanero', '');
  //         this.limpiarCampos();
  //       }, (error) => {
  //         console.log(JSON.stringify(error, null, 2));
  //         this.notificationService.showError('Ocurri?? un error al actualizar el movimiento aduanero', '');
  //       }
  //     );

  //     console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  //     console.log(this.registerForm.value);

  //     console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  //     console.log(this.registerForm.value);
  //     this.limpiarCampos();
  //   }
  //   this.router.navigate(['/admin/movimientosAsignados']);
  // }

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

  cargarControlPorNiveldeRiesgo(nivelDeRiesgo: string) {
      this.misPedidosService.getNivelRiesgoByProbabilidad(nivelDeRiesgo).subscribe(
        (data) => {
          console.log(data);
          console.log(data[0]);
          this.lstNivelDeRiesgo = data;
        }
      );
  }

  limpiarCampos() {
    this.registerForm.reset();
    this.submitted = false;
    this.isCleanField = true;
    this.usuarioService.clear();
  }

  cancelarOperacion() {
    this.limpiarCampos();
    this.router.navigate(['admin/movimientosAsignados']);
  }

  asignarMovimiento(usuario: String) {
    console.log('entrando a asignar movimiento...');
    console.log(usuario);
    console.log(this.id_movimiento);

    this.bodyOp = {usuario: usuario, movimiento: this.id_movimiento, autor: this.tokenStorage.getUsername()};
    this.misPedidosService.asignarOperadores(this.bodyOp)
      .subscribe((data: any) => {
        console.log(data);
        this.asignacion = data;
        this.notificationService.showSuccess(this.translate.instant('Movimiento asignado correctamente'), '');
        this.router.navigate(['/admin/movimientosPendientes']);
      }, (error: any) => {
        this.notificationService.showError(this.translate.instant('Ocurri?? un error al asignar el movimiento'), '');
        console.log(JSON.stringify(error, null, 2));
      });
  }

  // OBTENER LA VISUALIZACION DE LOS OPERADORES
  obtenerOperadores(): void {
    this.bodyOp = {rol_funcional: 'OPERADOR'};
    this.misPedidosService.getObtenerOperadores(this.bodyOp)
      .subscribe((data: any) => {
        this.operadores = data.user;
      }, (error: any) => {
        this.notificationService.showError(this.translate.instant('Ocurri?? un error al obtener los operadores'), '');
        console.log(JSON.stringify(error, null, 2));
      });
  }
}
