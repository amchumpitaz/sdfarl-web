import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from '../../../../../shared/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { ProductoService } from '../productos.service';
import { Producto } from '../productos.model';
import { forEach } from '@angular/router/src/utils/collection';
import { ERROR_INPUTS_REGISTER } from 'src/app/shared/constants/main.constants';
import { MisPedidosService } from '../../../mispedidos/mispedidos.service';
import { Incidencia } from '../../../mispedidos/incidencia.model';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'app-productos-mantenimiento',
  templateUrl: './productos-mantenimiento.component.html',
  styleUrls: ['./productos-mantenimiento.component.scss']
})
export class ProductosMantenimientoComponent implements OnInit, OnDestroy {

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

  categorias: any;
  tecnologias: any;
  lugarrecojos: any;
  tipoMonedas: any;
  ExistControlDB: boolean;
  model: Producto = new Producto();
  idProducto: number;
  title: string;
  condicions: any;
  isCleanField: boolean;
  incidencia: Incidencia;

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
    public router: Router) {
  }

  ngOnInit() {
  // Setting TipDocsCompany
  this.user = this.tokenStorage.getAuthorities();
  this.misPedidosService.getUser(this.tokenStorage.getUsername()).subscribe(
    (data) => {
      this.user = data;
    }, (error) => {
      console.log(JSON.stringify(error, null, 2));
    }
  );
  console.log(this.tokenStorage.getAuthorities());
  console.log(this.user);
  this.loadCategorias();
  // console.log(this.categorias);
  // Condicions for test
    this.condicions = [{
      id: 1,
      descripcion: 'Condición 1'
    },
    {
      id: 2,
      descripcion: 'Condición 2'
    },
    {
      id: 3,
      descripcion: 'Condición 3'
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
      id: 1,
      descripcion: 'SOL'
    },
    {
      id: 2,
      descripcion: 'DOL'
    },
    {
      id: 3,
      descripcion: 'EUR'
    }];

    // Load default IMGS
    this.imgs = [{
      img: 'assets/images/no-image.jpg'
    },
    {
      img: 'assets/images/no-image.jpg'
    },
    {
      img: 'assets/images/no-image.jpg'
    },
    {
      img: 'assets/images/no-image.jpg'
    },
    {
      img: 'assets/images/no-image.jpg'
    }];

    this.registerForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      direccion : ['', Validators.required],
      tipo : ['', Validators.required],
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required],
      img: ['', Validators.required]
    });
    this.submitted = false;

    if (this.productoService.get() != null) {

      this.idProducto = this.productoService.get();

      this.misPedidosService.getIncidenciaId(this.idProducto).subscribe(
        (data) => {
          console.log(data);
          this.model = data;
          // let realKey: string;
          // for (const key in this.model) {
          //   if (this.model[key]['codigo'] === this.idProducto) {
          //     realKey = key;
          //   }
          // }
          // console.log(realKey);
          this.registerForm.setValue({
            descripcion: this.model['descripcion'],
            direccion : this.model['direccion'],
            tipo : this.model['tipo']['codigo'],
            distrito: this.model['distrito'],
            provincia: this.model['provincia'],
            pais: this.model['pais'],
            img: this.model['imagenes']
          });
          // this.filesList = this.model['imagenes'];
          console.log(this.model['imagenes']);
          console.log(this.filesList);
          this.model['imagenes'].forEach(element => {
            // For pass validation form we set 'OK' when at least 1 img is selected
            // this.registerForm.get('img').setValue('OK');
            console.log(this.filesList);
            console.log(element);
            console.log(this.model['imagenes'].indexOf(element));

            let base64 =  element['archivo'];
            const date = new Date().valueOf();
            let text = '';
            const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
              text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
            }
            // Replace extension according to your media type
            const imageName = date + '.' + text + '.jpeg';
            // call method that creates a blob from dataUri
            const imageBlob = this.dataURItoBlob(base64);
            const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
            this.filesList['' + this.model['imagenes'].indexOf(element) + ''] = imageFile;
            // Set last img selected to big IMG SHOW
            const reader = new FileReader();
            this.imagePath = imageFile;
            reader.readAsDataURL(imageFile);
            reader.onload = (_event) => {
              this.imgURL = reader.result;
            };

            // Set last img selected to big IMG SHOW
            // const reader = new FileReader();
            // this.imagePath = element;
            // reader.readAsDataURL(element[0]);
            // reader.onload = (_event) => {
            //   this.imgURL = reader.result;
            // };

            // Set background to image preview to box of each element
            reader.onloadend = (_event) => {
              this.imgs[this.model['imagenes'].indexOf(element)].img = this.imgURL;
            };
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
      this.incidencia = new Incidencia(null,
        {codigo: this.registerForm.get('tipo').value},
        this.registerForm.get('descripcion').value,
        this.registerForm.get('direccion').value,
        this.registerForm.get('distrito').value,
        this.registerForm.get('provincia').value,
        this.registerForm.get('pais').value,
        new Date(),
        '1',
        this.user);
      // Here go register service
      console.log(this.incidencia);
      this.misPedidosService.createIncidencia(this.incidencia).subscribe(
        (data) => {
          console.log(data);
          console.log(data['codigo']);
          this.filesList.forEach(element => {
            const formData = new FormData();
            // formData.append('file', this.filesList[0]);
            formData.append('file', element);
            console.log(formData);
            this.misPedidosService.saveimages(formData, data['codigo']).subscribe(
              (data2) => {
                console.log(data2);
              }, (error) => {
                console.log(JSON.stringify(error, null, 2));
                this.notificationService.showError('Hubo un error en el registro', '');
              }
            );
          });
          this.notificationService.showSuccess('Se registro la incidencia con éxito', '');
        }, (error) => {
          console.log(JSON.stringify(error, null, 2));
          this.notificationService.showError('Hubo un error en el registro', '');
        }
      );

      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value);
    }
    // this.router.navigate(['/admin/productos']);
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

  loadCategorias() {
    this.categorias = [];
    this.misPedidosService.getTipoDeIncidencia().subscribe(
      (data) => {
        this.categorias = data;
      },
      error => {
        console.log(error);
      }
      );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
 }

}