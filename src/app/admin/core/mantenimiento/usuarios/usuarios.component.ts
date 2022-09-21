import { AdminModalService } from './../../helpers/adminAlert/modal.service';
import { Router } from '@angular/router';
import { Usuario } from './usuarios.model';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './usuarios.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { CategoriaService } from '../categorias/categoria.service';
import { MisPedidosService } from '../../mispedidos/mispedidos.service';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  categorias: any;
  textCategoria: string;

  username: any;
  body: any;
  movimientosAsignados: any;
  movimientosAsignadosActivos: any = [];

  registerForm: FormGroup;
  submitted: boolean;
  modal: NgbModalRef;

  imgs: any;

  public imagePath;
  imgURL: any;
  public message: string;
  public filesList: Array<File> = [];

  constructor(
    public modalDialogService: AdminModalService,
    public notificationService: NotificationService,
    private translate: TranslateService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private misPedidosService: MisPedidosService,
    public categoriaService: CategoriaService) {
    }

  ngOnInit() {
    this.username = this.tokenStorage.getUsername();

    this.body = {
      'usuario': this.username
    };

    this.misPedidosService.getListaMovimientosAsignados(this.body).subscribe(
      (data) => {
        console.log(data);
        this.movimientosAsignados = data.asig_movs;
        // console.log(data[0]['imagenes'][0]['archivo']);
        /* const base64 =  data[0]['imagenes'][0]['archivo'];
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

        // Set last img selected to big IMG SHOW
        const reader = new FileReader();
        this.imagePath = imageFile;
        reader.readAsDataURL(imageFile);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        }; */

        // Set background to image preview to box of each element
        // reader.onloadend = (_event) => {
        //   this.imgs[index].img = this.imgURL;
        // };
        // console.log(imageFile);
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  busquedaProductos(movimientosAsignados: any) {
    console.log(movimientosAsignados);
  }

  limpiarBusqueda() {
    this.movimientosAsignados = {
      id: null,
      nivel_riesgo: null
    };
  }

  modalEliminarProducto(id: number) {
    this.modalDialogService.confirm(this.translate.instant('Eliminar Producto'),
      this.translate.instant('¿Está seguro que desea eliminar el producto?'))
      .then((confirmed) => { this.eliminarProducto(id); })
      .catch(() => console.log('Canceló la operación'));
  }

  // METODO PARA ELIMINAR LA VERSION
  eliminarProducto(idProductoEliminar: number) {
    this.notificationService.showSuccess(this.translate.instant('Se eliminó el producto con id') + ': ' + idProductoEliminar, '');
    this.modal.close();
  }

  checkAll(ev) {
    this.movimientosAsignados.forEach(x => x.state = ev.target.checked);
  }

  isAllChecked() {
    return this.movimientosAsignados.every(_ => _.state);
  }

  eliminaMasiva() {
    for (let index = 0; index < this.movimientosAsignadosActivos.length; index++) {
      this.movimientosAsignadosActivos.splice(index);
    }

    for (const key in this.movimientosAsignados) {
      if (this.movimientosAsignados[key]['state'] === true) {
        this.movimientosAsignadosActivos.push(this.movimientosAsignados[key]['id']);
      }
    }
    console.log(this.movimientosAsignadosActivos);
  }

  getCategoriaById(id: number) {
    this.textCategoria = '';
    for (const key in this.categorias) {
      if (this.categorias[key]['id'] === id) {
        this.textCategoria = this.categorias[key]['titulo'];
      }
    }
    return this.textCategoria;
  }

  getProductoById(id: number) {
    this.usuarioService.add(id);
    this.body = {'movimiento' : id};
    this.router.navigate(['admin/movimientosAsignados/mantenimiento']);
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
