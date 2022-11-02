import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';
import { NotificationService } from 'src/app/shared/services';
import { AdminModalService } from '../../helpers/adminAlert/modal.service';
import { MisPedidosService } from '../../mispedidos/mispedidos.service';
import { CategoriaService } from '../categorias/categoria.service';
import { UsuarioService } from '../usuarios/usuarios.service';

@Component({
  selector: 'app-movimientos-pendientes',
  templateUrl: './movimientos-pendientes.component.html',
  styleUrls: ['./movimientos-pendientes.component.scss']
})
export class MovimientosPendientesComponent implements OnInit {

  categorias: any;
  textCategoria: string;

  username: any;
  body: any;
  movimientosAsignados: any;
  movimientosAsignadosActivos: any = [];

  registerForm: FormGroup;
  submitted: boolean;
  modal: NgbModalRef;
  rol: any;

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
    this.rol = this.tokenStorage.getAuthorities();
    this.body = {
      'usuario': this.username
    };
    console.log(this.body);

    this.misPedidosService.getListaMovimientosPendientes(this.body).subscribe(
      (data) => {
        console.log(data);
        this.movimientosAsignados = data.asig_movs;
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
    this.modalDialogService.confirm(this.translate.instant('Eliminar Movimiento Aduanero'),
      this.translate.instant('¿Está seguro que desea eliminar el Movimiento Aduanero?'))
      .then((confirmed) => { this.eliminarProducto(id); })
      .catch(() => console.log('Canceló la operación'));
  }

  // METODO PARA ELIMINAR LA VERSION
  eliminarProducto(idProductoEliminar: number) {
    this.notificationService.showSuccess(this.translate.instant('Se eliminó el movimiento aduanero con id') + ': ' + idProductoEliminar, '');
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
    this.router.navigate(['admin/movimientosPendientes/mantenimiento']);
  }

  getPercentFraude(probabilidad: string) {
    return (parseFloat(probabilidad) * 100).toFixed(2);
  }

  getNivelRiesgo(probabilidad: string) {
    return ((parseFloat(probabilidad) * 100) < 40) ? 1 : ((parseFloat(probabilidad) * 100) < 60) ? 2 : 3;
  }

}
