import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MENU_DETALLE_TECNICO,PROCESSING_PROCESS, VALID_ARCHIVE, PROCCESSING_DATA, INVALID_ARCHIVE } from 'src/app/shared/constants/main.constants';
import { CargaService } from '../carga.service';
import { UtilsService, NotificationService } from 'src/app/shared/services';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArchivoCarga } from '../archivo-carga.model';
import { Observable, Subscription } from 'rxjs';
import { ProcesoCarga } from '../proceso-carga.model';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-docTecnicos-carga',
  templateUrl: './docTecnicos-carga.component.html',
  styleUrls: ['./docTecnicos-carga.component.scss']
})
export class DocTecnicosCargaComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput')
  myInputVariable: ElementRef;
  menu: string;
  selectedFile: File;
  archivoCargado: any;
  tipoArchivo: any;
  validArchivo: boolean;
  archivoCodificado: any;
  archivoCarga: Observable<ArchivoCarga[]>;

  proceso: ProcesoCarga;
  selectedEntry: any;
  btnProcesarCarga: boolean;
  btnSeleccionarArchivo: boolean;

  subCreateCarga: Subscription;
  subCargaError: Subscription;
  porcentaje: any;

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
              private spinner: NgxSpinnerService) {
                config.backdrop = 'static';
                config.keyboard = false;
               }

  ngOnInit() {
    this.menu = MENU_DETALLE_TECNICO;
    document.getElementById('cargaSubMenu').className = 'list-group-item router-link-active';

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

  getDetalleProduct(id: number) {
    console.log('entrando a traer detalle producto...');
    console.log(id);
  }

    // METODO QUE PERMITE OBTENER EL ARCHIVO SELECCIONADO PARA EL PRODUCTO SELECCIONADO
  onFileChanged(event: any, id: number) {
    console.log('ID DEL PRODUCTO: ' + id);
    let extension: any;
    this.selectedFile = event.target.files[0];
    this.archivoCargado = this.selectedFile.name;
    extension = this.selectedFile.name.split('.').pop();
    // VALIDAR LA EXTENSION DEL ARCHIVO
    if (extension === 'zip') {
      this.tipoArchivo = 1;
      this.validArchivo = true;
    } else if (extension === 'rar') {
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

   // LIMPIAR EL FORMULARIO
  nuevoProcesoCarga(): void {
    this.btnSeleccionarArchivo = false;
    this.btnProcesarCarga = false;
    this.selectedEntry = null;
    this.archivoCargado = null;
    this.myInputVariable.nativeElement.value = '';
    this.tipoArchivo = null;
  }

  getDetalleSubidaDT(id: number) {
    console.log('Entrando a obtener el detalle de la subida de los det. técnicos.');
    console.log(id);
  }

  openModal(info: any) {
    this.modal = this.modalService.open(info, {size: 'lg'});
  }

  ocultarModal(): void {
    this.modal.close();
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
}
