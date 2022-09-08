import { AdminModalService } from './../../helpers/adminAlert/modal.service';
import { Router } from '@angular/router';
import { Usuario } from './usuarios.model';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './usuarios.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  nrodocumento: any;
  documento: any;

  perfiles: any;
  perfil: any;

  usuarios: any;
  usuariosActivos: any = [];

  usuario: Usuario = new Usuario();
  modal: NgbModalRef;
  constructor(private router: Router,
    private translate: TranslateService,
    public modalDialogService: AdminModalService,
    public notificationService: NotificationService,
    public usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.nrodocumento = [{
      id: 1,
      nombre: 'DNI'
    },
    {
      id: 2,
      nombre: 'Carnet Extranjeria'
    },
    {
      id: 3,
      nombre: 'Pasaporte'
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

    this.usuario.perfil = null;
    this.usuario.tipodocumento = null;

    // Tabla
    this.usuarios = [{
      id: 1,
      perfil: 'Administrador',
      usuario: 'aa@enel.com',
      nombre: 'Juan',
      apellidopaterno: 'Perez',
      apellidomaterno: 'Aruba',
      tipodocumento: 'DNI',
      nrodocumento: '43412230',
      nacionalidad: 'Peruana',
      empresa: 'Indra'
    },
    {
      id: 2,
      perfil: 'Aprobador',
      usuario: 'zz@enel.com',
      nombre: 'Marco',
      apellidopaterno: 'Prieto',
      apellidomaterno: 'Armado',
      tipodocumento: 'DNI',
      nrodocumento: '74345050',
      nacionalidad: 'Peruana',
      empresa: 'Enel'
    }];
  }

  checkAll(ev) {
    this.usuarios.forEach(x => x.state = ev.target.checked);
  }

  isAllChecked() {
    return this.usuarios.every(_ => _.state);
  }

  eliminaMasiva() {
    for (let index = 0; index < this.usuariosActivos.length; index++) {
      this.usuariosActivos.splice(index);
    }

    for (const key in this.usuarios) {
      if (this.usuarios[key]['state'] === true) {
        this.usuariosActivos.push(this.usuarios[key]['id']);
      }
    }
    console.log(this.usuariosActivos);
  }

  busquedaUsuarios(usuario: Usuario) {
    console.log(usuario);
  }

  limpiarBusqueda() {
    this.usuario = {
      perfil: null,
      nombre: null,
      apellidos: null,
      empresa: null,
      tipodocumento: null,
      nrodocumento: null
    };
  }
  modalEliminarUsuario(id: number) {
    this.modalDialogService.confirm('Eliminar Usuario', '¿Está seguro que desea eliminar el usuario?')
      .then((confirmed) => { this.eliminarUsuario(id); })
      .catch(() => console.log('Canceló la operación'));
  }
  // METODO PARA ELIMINAR LA VERSION
  eliminarUsuario(idUsuarioEliminar: number) {
    this.notificationService.showSuccess('Se elimino el usuario con id: ' + idUsuarioEliminar, '');
    this.modal.close();
  }
  getUsuarioById(id: number) {
    this.usuarioService.add(id);
    this.router.navigate(['admin/usuarios/mantenimiento']);
  }
}
