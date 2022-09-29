import { Component, OnInit } from '@angular/core';
import { Producto } from './productos.model';
import { ModalService } from 'src/app/shared/alert/modal.service';
import { Categoria } from './categorias.model';
import { TranslateService } from '@ngx-translate/core';
import { CategoriaService } from '../categorias/categoria.service';
import { Router } from '@angular/router';
import { ProductoService } from './productos.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/shared/services';
import { AdminModalService } from '../../helpers/adminAlert/modal.service';
import { MisPedidosService } from '../../mispedidos/mispedidos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  categorias: any;
  textCategoria: string;

  productos: any;
  producto: Producto = new Producto();
  productosActivos: any = [];

  categoria: Categoria = new Categoria();
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
    private router: Router,
    private productoService: ProductoService,
    private misPedidosService: MisPedidosService,
    public categoriaService: CategoriaService) {
    }

  ngOnInit() {
    this.cargarControles();
  }

  cargarControles() {
    this.misPedidosService.getControles().subscribe(
      (data) => {
        console.log(data);
        this.productos = data;
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }

  busquedaProductos(producto: Producto) {
    console.log(producto);
  }

  limpiarBusqueda() {
    this.producto = {
      id: null,
      nivel_riesgo: null
    };
  }

  modalEliminarProducto(id: number) {
    this.modalDialogService.confirm(this.translate.instant('Eliminar Control de Riesgo'),
      this.translate.instant('¿Está seguro que desea eliminar el Control de Riesgo?'))
      .then((confirmed) => { this.eliminarProducto(id); })
      .catch(() => console.log('Canceló la operación'));
  }

  // METODO PARA ELIMINAR LA VERSION
  eliminarProducto(idProductoEliminar: number) {
    this.notificationService.showSuccess(this.translate.instant('Se eliminó el Control de Riesgo con id') + ': ' + idProductoEliminar, '');
    this.misPedidosService.deleteControlId(idProductoEliminar).subscribe(
      (data) => {
        console.log(data);
        this.cargarControles();
      });
      this.modal.close();
  }

  checkAll(ev) {
    this.productos.forEach(x => x.state = ev.target.checked);
  }

  isAllChecked() {
    return this.productos.every(_ => _.state);
  }

  eliminaMasiva() {
    for (let index = 0; index < this.productosActivos.length; index++) {
      this.productosActivos.splice(index);
    }

    for (const key in this.productos) {
      if (this.productos[key]['state'] === true) {
        this.productosActivos.push(this.productos[key]['id']);
      }
    }
    console.log(this.productosActivos);
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
    this.productos = null;
    this.productoService.add(id);
    this.router.navigate(['admin/controles/mantenimiento']);
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
