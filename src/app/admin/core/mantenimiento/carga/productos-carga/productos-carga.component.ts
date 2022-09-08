import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ProcesoCarga } from '../proceso-carga.model';
import { CargaError } from '../carga-error.model';
import { Observable, Subscription } from 'rxjs';
import { CargaService } from '../carga.service';
import { UtilsService, NotificationService } from 'src/app/shared/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';
import { MENU_PRODUCTOS, PROCESSING_PROCESS, INVALID_ARCHIVE, PROCCESSING_DATA, VALID_ARCHIVE } from 'src/app/shared/constants/main.constants';
import { ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { ArchivoCarga } from '../archivo-carga.model';

// import { HttpEvent, HttpEventType } from '@angular/common/http';
// import { finalize } from 'rxjs/operators';
// import { ERROR_DE_CARGA, MENU_PRODUCTOS } from 'src/app/shared/constants/main.constants';
// import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-productos-carga',
  templateUrl: './productos-carga.component.html',
  styleUrls: ['./productos-carga.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductosCargaComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  menu: string;
  selectedEntry: any;
  proceso: ProcesoCarga;
  archivoCodificado: any;
  tbResultado: boolean;
  btnSeleccionarArchivo: boolean;
  btnProcesarCarga: boolean;
  archivoCargado: any;
  opcionSeleccionada = null;

  meses: any;
  anios: any;
  mesesxAnio: any;
  anioActual: number = new Date().getFullYear();
  mesActual: number;
  mesSeleccionado: number;
  anioSeleccionado: number;

  selectedFile: File;
  tipoArchivo: any;
  archivoCarga: Observable<ArchivoCarga[]>;
  cargaError: Observable<CargaError[]>;
  procesoImportacion: any;

  subCreateCarga: Subscription;
  subCargaError: Subscription;
  porcentaje: any;

  validArchivo: boolean;
  textModal: string;
  textModalProcess: string;
  modal: NgbModalRef;

  constructor(private cargaService: CargaService,
              private utilsService: UtilsService,
              public notificationService: NotificationService,
              private modalService: NgbModal,
              private config: NgbModalConfig,
              private modalDialogService: ModalService,
              private translate: TranslateService,
              // private scrollToService: ScrollToService,
              private spinner: NgxSpinnerService
              ) {
                config.backdrop = 'static';
                config.keyboard = false;
               }

  ngOnInit() {
    this.menu = MENU_PRODUCTOS;
    this.anios = this.utilsService.getYears();
    // hack: los meses van de 0 a 11, se suma 1 para hacer el comparativo
    this.mesActual = new Date().getMonth() + 1;
    this.tbResultado = true;
    this.opcionSeleccionada = this.translate.instant('Primero seleccione una opción de la lista de archivos');

    // Data
    this.obtenerArchivos();
  }

  ngOnDestroy() {
    if (this.subCreateCarga !== undefined) {
      this.subCreateCarga.unsubscribe();
    }

    if (this.subCargaError !== undefined) {
      this.subCargaError.unsubscribe();
    }
  }

  openModal(info: any) {
    this.modal = this.modalService.open(info, {size: 'lg'});
  }

  ocultarModal(): void {
    this.modal.close();
  }

  // METODO QUE PERMITE OBTENER EL ARCHIVO SELECCIONADO
  onFileChanged(event: any) {
    let extension: any;
    this.selectedFile = event.target.files[0];
    this.archivoCargado = this.selectedFile.name;
    extension = this.selectedFile.name.split('.').pop();
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
      this.textModal = this.translate.instant(VALID_ARCHIVE);
      this.textModalProcess = this.translate.instant(PROCCESSING_DATA);
    } else {
      this.textModal = this.translate.instant(INVALID_ARCHIVE);
    }

    this.uploadDocument(this.selectedFile);
    this.btnProcesarCarga = true;
    this.spinner.show();
    console.log('Entramos en onfileChanged');
    // We open modal INFO
    document.getElementById('buttonOpenModal').click();
    // Call method procesoCarga()
    this.procesoCarga();
  }

  // METODO QUE PERMITE REALIZAR EL CODIFICADO DEL ARCHIVO EN BASE 64
  uploadDocument(selectedFile: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.archivoCodificado = btoa(fileReader.result as string);
    };
    fileReader.readAsBinaryString(selectedFile);
  }

  // METODO QUE PERMITE OBTENER EL VALOR AL SELECCIONAR UN RADIOBUTTON
  onSelectionChange(entry: any) {
    this.tbResultado = true;
    this.selectedEntry = entry;
    this.btnSeleccionarArchivo = true;
    this.opcionSeleccionada = null;
  }

  // OBTENER LA VISUALIZACION DE LOS ARCHIVOS CARGADOS
  obtenerArchivos(): void {
    this.cargaService.getCargaArchivo()
      .subscribe((data: any) => {
        this.archivoCarga = data;
        // Turn false for bottom btnProcesarCarga
        for (const key in this.archivoCarga) {
          if (this.archivoCarga[key]['estado'] === PROCESSING_PROCESS) {
            this.btnProcesarCarga = true;
          }
        }
      }, (error: any) => {
        this.spinner.hide();
        this.notificationService.showError(this.translate.instant('Ocurrió un error al obtener los archivos de carga'), '');
        console.log(JSON.stringify(error, null, 2));
      });
  }

  // ENVIAR VALORES PARA PROCESO DE CARGA
  validarProcesarCarga(): void {
    if (this.mesSeleccionado === undefined) {
      this.mesSeleccionado = this.mesActual;
    }
    if (this.selectedEntry === undefined || this.selectedEntry === null) {
      this.notificationService.showError(this.translate.instant('Debe seleccionar una opción'), this.translate.instant('Error'));
    }
    if (this.archivoCargado === undefined || this.archivoCargado === null) {
      this.notificationService.showError(this.translate.instant('Debe seleccionar un archivo'), this.translate.instant('Error'));
    }
    if (this.tipoArchivo === 3) {
      this.notificationService.showError(this.translate.instant('Debe seleccionar un tipo de archivo Excel'), this.translate.instant('Error'));
    }
    if (this.selectedEntry !== undefined && this.archivoCargado !== null &&
      this.archivoCargado !== undefined && this.selectedEntry !== null && this.tipoArchivo !== 3) {
      this.procesoCarga();
    }
  }

  descargarPlantilla() {
    console.log('Descargar archivo de plantilla en excel');
  }

  triggerScrollToOffsetOnly(offset: number = 0) {
    const config: ScrollToConfigOptions = {
      offset
    };
    // this.scrollToService.scrollTo(config);
  }

  procesoCarga(): void {
    this.spinner.show();
    this.proceso = {
      id_carga: this.selectedEntry,
      fecha: new Date(),
      estado: 'EN PROCESO',
      usuario: 'lortega@indracompany.com', // Get user from session
    };
    console.log(this.proceso);
    console.log('Entramos al metodo de carga del archivo');
    // this.subCreateCarga =
    //  this.cargaService.createCarga(this.proceso).pipe(
    //   finalize(() => this.spinner.hide())
    // ).subscribe((event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         // console.log('Request sent!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         // console.log('Response header received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         // const percentDone = Math.round(100 * event.loaded / event.total);
    //         // for (let i = 0; i < percentDone; i ++) {
    //         //   console.log(i);
    //         // }
    //         // console.log(`File is ${percentDone}% uploaded.`);
    //         this.porcentaje = Math.round(100 * event.loaded / event.total);
    //         break;
    //       case HttpEventType.DownloadProgress:
    //         // console.log(`Download in progress!`);
    //         break;
    //       case HttpEventType.Response:
    //         if (event.body.text === 'FECHA_INCORRECTA') {
    //           this.notificationService.showError(MENSAJE_FECHA_INCORRECTA, '');
    //         } else if (event.body.text === 'ERROR_PROCESO_CARGA') {
    //           this.notificationService.showError(MENSAJE_CARGA_ERROR, '');
    //         } else if (event.body.text === 'MENSAJE_ERROR_IMPORTACION') {
    //           this.notificationService.showError(MENSAJE_ERROR_IMPORTACION, '');
    //         } else if (event.body.text === 'ERROR_CABECERA_ARCHIVO') {
    //           this.notificationService.showError(ERROR_CABECERA_ARCHIVO, '');
    //         } else if (event.body.text === 'ERROR') {
    //           this.notificationService.showError(ERROR_DE_CARGA, '');
    //         } else {
    //           this.notificationService.showSuccess(event.body.text, '');
    //         }
    //         this.obtenerResultdosArchivos();
    //         this.tbResultado = false;
    //         this.obtenerArchivos();
    //         // Se baja al final del documento
    //         this.triggerScrollToOffsetOnly(400);
    //     }
    //     // console.log(event);
    // }, (error: any) => {
    //   this.spinner.hide();
    //   console.log(JSON.stringify(error, null, 2));
    // });
    // Limpiar el formulario

    // In case process completed
    // this.textModalProcess = PROCESS_COMPLETED;
    this.nuevoProcesoCarga();
  }

  // OBTENER EL RESULTADO DE LA CARGA
  obtenerResultdosArchivos(): void {
    this.cargaService.getCargaArchivoError()
      .subscribe( data => {
        this.cargaError = data;
      });
  }

  identify(index: number, item: any) {
    return item.descripcion;
  }

  // LIMPIAR EL FORMULARIO
  nuevoProcesoCarga(): void {
    this.btnSeleccionarArchivo = false;
    this.btnProcesarCarga = false;
    this.selectedEntry = null;
    this.archivoCargado = null;
    this.myInputVariable.nativeElement.value = '';
    this.tipoArchivo = null;
  }

  // REALIZAR LA EXPORTACION DE LOS ERRORES PRESENTADOS EN LA CARGA
  descargarCargaError(id: number) {
    console.log('Entrando a método para obtener log de errores');
    this.spinner.show();
    this.subCargaError =
    this.cargaService.donwloadExcelCargaError(id)
      .subscribe((data) => {
        saveAs(data, 'carga-detalle.xlsx');
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
        console.log(JSON.stringify(error, null, 2));
      });
  }

  getDetalleProduct(id: number) {
    console.log('entrando a traer detalle producto...');
    console.log(id);
  }
}

