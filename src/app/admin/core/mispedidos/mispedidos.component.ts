import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ERROR_INPUTS_REGISTER } from 'src/app/shared/constants/main.constants';
import { Producto } from '../mantenimiento/productos/productos.model';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ProductoService } from '../mantenimiento/productos/productos.service';
import { MisPedidosService } from './mispedidos.service';
import { Incidencia } from './incidencia.model';
import { element } from '@angular/core/src/render3';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss']
})
export class MispedidosComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  selectedFile: File;
  btnProcesarCarga: boolean;
  archivoCargado: any;
  tipoArchivo: any;
  validArchivo: boolean;
  archivoCodificado: any;
  user: any;

  registerForm: FormGroup;
  submitted: boolean;

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
  ExistControlDB: boolean;
  model: Producto = new Producto();
  idProducto: number;
  title: string;
  condicions: any;
  isCleanField: boolean;
  incidencia: any;

  asignacion: any;
  operadores: any;
  bodyOp: any;

  casoFraude: any;
  id_movimiento: any;
  textModal: any;
  textModalProcess: any;
  modal: NgbModalRef;

  imgs: any;

  public imagePath;
  imgURL: any;
  public message: string;
  public filesList: Array<File> = [];

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private misPedidosService: MisPedidosService,
    public notificationService: NotificationService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public router: Router) {
  }

  ngOnInit() {
  // Setting TipDocsCompany
  this.user = this.tokenStorage.getAuthorities();
  // this.misPedidosService.getUser(this.tokenStorage.getUsername()).subscribe(
  //   (data) => {
  //     this.user = data;
  //   }, (error) => {
  //     console.log(JSON.stringify(error, null, 2));
  //   }
  // );
  console.log(this.tokenStorage.getAuthorities());
  console.log(this.user);
  this.loadAduanas();
  this.obtenerOperadores();
  // console.log(this.categorias);
  // Condicions for test
    this.condicions = [{
      id: '1.0',
      descripcion: 'Santamaría'
    },
    {
      id: '1.0',
      descripcion: 'Paso Canoas'
    },
    {
      id: '0.66666667',
      descripcion: 'La Anexión'
    },
    {
      id: '0.66666667',
      descripcion: 'Caldera'
    },
    {
      id: '0.0',
      descripcion: 'Limón'
    },
    {
      id: '0.0',
      descripcion: 'Peñas Blancas'
    },
    {
      id: '0.0',
      descripcion: 'Aduana Central'
    }];

    // modalidad for test
    this.modalidad = [{
      id: '0.0',
      descripcion: 'Importación para el Consumo'
    },
    {
      id: '0.0',
      descripcion: 'Admisión Temporal para Reexportación en el Mismo Estado'
    },
    {
      id: '0.0',
      descripcion: 'Admisión Temporal para Perfeccionamiento Activo'
    },
    {
      id: '0.28571429',
      descripcion: 'Reimportación en el mismo estado'
    },
    {
      id: '0.28571429',
      descripcion: 'Deposito Aduanero'
    },
    {
      id: '0.28571429',
      descripcion: 'Tránsito aduanero'
    },
    {
      id: '1.0',
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
      descripcion: 'Perú'
    },
    {
      id: '0.82653061',
      descripcion: 'Nicaragua'
    },
    {
      id: '0.54591837',
      descripcion: 'México'
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
      descripcion: 'Máquinas y aparatos de clasificar, cribar, separar, lavar'
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
      descripcion: 'Cueros y pieles de reptil, curtidos o crust, incluso divididos pero sin otra preparación'
    },
    {
      id: '0.36363636',
      descripcion: 'Placas y hojas de vidrio, armadas, incluso con capa absorbente'
    },
    {
      id: '0.784090909',
      descripcion: 'Bombas para distribución de carburantes o lubricantes'
    }];

  // Tecnologias for test
    this.tecnologias = [{
      id: 1,
      descripcion: 'Tecnología 1'
    },
    {
      id: 2,
      descripcion: 'Tecnología 2'
    },
    {
      id: 3,
      descripcion: 'Tecnología 3'
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
      id: '0.0',
      descripcion: 'Aduanero'
    }];

  this.aduanaingresoegreso = [
    {
      id: '0.42857143',
      descripcion: 'Caldera'
    },
    {
      id: '0.57142857',
      descripcion: 'Limón'
    },
    {
      id: '1.0',
      descripcion: 'Peñas Blancas'
    },
    {
      id: '0.0',
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
        id: '0.0',
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
        id: '1.0',
        descripcion: 'Costa Rica'
      },
      {
        id: '0.24744898',
        descripcion: 'El Salvador'
      },
      {
        id: '0.0',
        descripcion: 'Perú'
      },
      {
        id: '0.68239796',
        descripcion: 'Nicaragua'
      },
      {
        id: '0.12755102',
        descripcion: 'México'
      }];

    this.registerForm = this.formBuilder.group({
      modalidad: ['', Validators.required],
      aduana: ['', Validators.required],
      importador: ['', Validators.required],
      bultos: ['', Validators.required],
      pesoneto: ['', Validators.required],
      pesobruto: ['', Validators.required],
      paisorigen: ['', Validators.required],
      capitulo: ['', Validators.required],
      partidaarancelaria: ['', Validators.required],
      subpartidaarancelaria: ['', Validators.required],
      partidaregional: ['', Validators.required],
      aperturanacional: ['', Validators.required],
      regimen: ['', Validators.required],
      aduanaingresoegreso: ['', Validators.required],
      codigobanco: ['', Validators.required],
      paisprocedencia: ['', Validators.required],
      seguroitem: ['', Validators.required],
      valoraduanausd: ['', Validators.required],
      agenteaduana: ['', Validators.required],
      valortotaladuanausd: ['', Validators.required]
    });
    this.submitted = false;

    if (this.productoService.get() != null) {

      this.idProducto = this.productoService.get();

      this.productoService.getIncidenciaId(this.idProducto).subscribe(
        (data) => {
          console.log(data);
          this.model = data;
          let realKey: string;
          for (const key in this.model) {
            if (this.model[key]['id'] === this.idProducto) {
              realKey = key;
            }
          }
          console.log(realKey);
          this.registerForm.setValue({
            titulo: this.model[realKey].titulo,
            codigo: this.model[realKey].codigo,
            descripcion: this.model[realKey].descripcion,
            precio: this.model[realKey].precio,
            tipoMoneda: this.model[realKey].tipoMoneda,
            cantidad: this.model[realKey].cantidad,
            nombrecontacto : this.model[realKey].nombreContacto,
            categoria : this.model[realKey].categoria,
            email: this.model[realKey].correoContacto,
            tecnologia : this.model[realKey].tecnologia,
            condicion : this.model[realKey].condicion,
            lugarrecojo : this.model[realKey].lugarRecojo,
            archivoCargado : this.model[realKey].detalleTecnico,
            productoDestacado : this.model[realKey].productoDestacado,
            img : this.model[realKey].img1,
          });
        });

      console.log(this.productoService.get());
      this.title = this.translate.instant('Actualizar');
    } else {
      this.title = this.translate.instant('Registrar');
    }
    console.log(this.imgs);
  }

  ngOnDestroy() {
    this.limpiarCampos();
  }

  openModal(info: any) {
    this.modal = this.modalService.open(info, {size: 'lg'});
  }

  ocultarModal(): void {
    this.modal.close();
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
      this.incidencia = new Array(
        parseFloat(this.registerForm.get('modalidad').value),
        parseFloat(this.registerForm.get('aduana').value),
        parseFloat(this.registerForm.get('importador').value),
        parseFloat(this.registerForm.get('bultos').value),
        parseFloat(this.registerForm.get('pesoneto').value),
        parseFloat(this.registerForm.get('pesobruto').value),
        parseFloat(this.registerForm.get('paisorigen').value),
        parseFloat(this.registerForm.get('capitulo').value),
        parseFloat(this.registerForm.get('partidaarancelaria').value),
        parseFloat(this.registerForm.get('subpartidaarancelaria').value),
        parseFloat(this.registerForm.get('partidaregional').value),
        parseFloat(this.registerForm.get('aperturanacional').value),
        parseFloat(this.registerForm.get('regimen').value),
        parseFloat(this.registerForm.get('aduanaingresoegreso').value),
        parseFloat(this.registerForm.get('codigobanco').value),
        parseFloat(this.registerForm.get('paisprocedencia').value),
        parseFloat(this.registerForm.get('seguroitem').value),
        parseFloat(this.registerForm.get('valoraduanausd').value),
        parseFloat(this.registerForm.get('agenteaduana').value),
        parseFloat(this.registerForm.get('valortotaladuanausd').value));
      // Here go register service
      console.log(this.incidencia);
      this.misPedidosService.createIncidencia(this.incidencia).subscribe(
        (data) => {
          console.log(data);
          console.log(data['predictions']['predictions'][0]);
          document.getElementById('buttonOpenModal').click();
          this.textModal = data['predictions']['predictions'][0];
          this.textModal = (Math.round(this.textModal * 100) / 100) * 100;
          this.casoFraude = (this.textModal < 40) ? 0 : (this.textModal < 60) ? 1 : 2;
          this.id_movimiento = data['movimiento'];
          console.log(data['predictions']['predictions'][0]);
          console.log(this.textModal);
          console.log(this.casoFraude);
          this.limpiarCampos();
        }, (error) => {
          console.log(JSON.stringify(error, null, 2));
          this.notificationService.showError('Ocurrió un erro al validar el movimiento aduanero', '');
        }
      );

      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value);
    }
    // this.router.navigate(['/admin/productos']);
  }

  // OBTENER LA VISUALIZACION DE LOS OPERADORES
  obtenerOperadores(): void {
    this.bodyOp = {rol_funcional: 'OPERADOR'};
    this.misPedidosService.getObtenerOperadores(this.bodyOp)
      .subscribe((data: any) => {
        this.operadores = data.user;
      }, (error: any) => {
        this.spinner.hide();
        this.notificationService.showError(this.translate.instant('Ocurrió un error al obtener los operadores'), '');
        console.log(JSON.stringify(error, null, 2));
      });
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
        this.ocultarModal();
      }, (error: any) => {
        this.spinner.hide();
        this.notificationService.showError(this.translate.instant('Ocurrió un error al asignar el movimiento'), '');
        console.log(JSON.stringify(error, null, 2));
      });
  }

  // METODO QUE PERMITE OBTENER EL ARCHIVO SELECCIONADO
  onFileChanged(event: any) {
    let extension: any;
    this.selectedFile = event.target.files[0];
    // this.archivoCargado = this.selectedFile.name;
    this.registerForm.get('archivoCargado').setValue(this.selectedFile ? this.selectedFile.name : '');
    extension = this.selectedFile.name.split('.').pop();
    console.log(this.selectedFile);
    // VALIDAR LA EXTENSION DEL ARCHIVO
    if (extension === 'xls') {
      this.tipoArchivo = 1;
      this.validArchivo = true;
    } else if (extension === 'xlsx') {
      this.tipoArchivo = 2;
      this.validArchivo = true;
    } else {
      this.tipoArchivo = 3;
      this.validArchivo = false;
    }
    if (this.validArchivo) {
      // this.textModal = this.translate.instant(VALID_ARCHIVE);
      // this.textModalProcess = this.translate.instant(PROCCESSING_DATA);
    } else {
      // this.textModal = this.translate.instant(INVALID_ARCHIVE);
    }

    this.uploadDocument(this.selectedFile);
    // this.btnProcesarCarga = true;
    console.log('Entramos en onfileChanged');
    // We open modal INFO
    // document.getElementById('buttonOpenModal').click();
    // Call method procesoCarga()
    // this.procesoCarga();
  }

  // METODO QUE PERMITE REALIZAR EL CODIFICADO DEL ARCHIVO EN BASE 64
  uploadDocument(selectedFile: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.archivoCodificado = btoa(fileReader.result as string);
    };
    fileReader.readAsBinaryString(selectedFile);
  }

  limpiarCampos() {
    this.registerForm.reset();
    this.submitted = false;
    this.isCleanField = true;
    this.productoService.clear();
  }

  cancelarOperacion() {
    this.limpiarCampos();
    this.router.navigate(['admin/incidencia']);
  }

  preview(files: Blob[], index: any) {
    this.filesList['' + index + ''] = files[0];
    // For pass validation form we set 'OK' when at least 1 img is selected
    this.registerForm.get('img').setValue('OK');
    console.log(this.filesList);
    console.log(files);
    console.log(index);
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = this.translate.instant('Por favor subir sólo imágenes');
      return;
    }

    // Set last img selected to big IMG SHOW
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };

    // Set background to image preview to box of each element
    reader.onloadend = (_event) => {
      this.imgs[index].img = this.imgURL;
    };
  }

  previewImgToBigPanel(img: number) {
    this.imgURL = this.imgs[img].img;
  }

  loadAduanas() {
    this.aduanas = [{
      id: 0.0,
      descripcion: 'Santamaría'
    },
    {
      id: 0.0,
      descripcion: 'Paso Canoas'
    },
    {
      id: 0.0,
      descripcion: 'La Anexión'
    },
    {
      id: 0.0,
      descripcion: 'Caldera'
    },
    {
      id: 0.66666667,
      descripcion: 'Limón'
    },
    {
      id: 1.,
      descripcion: 'Peñas Blancas'
    },
    {
      id: 1.0,
      descripcion: 'Aduana Central'
    }];
    // this.misPedidosService.getTipoDeIncidencia().subscribe(
    //   (data) => {
    //     this.categorias = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    //   );
  }

}
