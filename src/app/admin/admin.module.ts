import { AdminAlertModule } from './core/helpers/adminAlert/adminAlert.module';
import { ProductosVendidosComponent } from './core/reportes/productos-vendidos/productos-vendidos.component';
import { MispedidosComponent } from './core/mispedidos/mispedidos.component';
import { DatosComponent } from './core/miperfil/datos/datos.component';
import { CambiarcontraseniaComponent } from './core/miperfil/cambiarcontrasenia/cambiarcontrasenia.component';
import { CategoriasComponent } from './core/mantenimiento/categorias/categorias.component';
import { HistorialComponent } from './core/historial/historial.component';
import { AdminComponent } from './admin.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MainRoutingModule } from '../entities/main.routing.module';
import { HeaderAdminComponent } from '../adminLayout/header-admin/header-admin.component';
import { SidebarAdminComponent } from '../adminLayout/sidebar-admin/sidebar-admin.component';
import { ProductosComponent } from './core/mantenimiento/productos/productos.component';
import { UsuariosComponent } from './core/mantenimiento/usuarios/usuarios.component';
import { PedidosComponent } from './core/pedidos/pedidos.component';
import { ProductosConsultadosComponent } from './core/reportes/productos-consultados/productos-consultados.component';
import { TiempoPublicacionComponent } from './core/reportes/tiempo-publicacion/tiempo-publicacion.component';
import { VentasCompradoresComponent } from './core/reportes/ventas-compradores/ventas-compradores.component';
import { UsuariosMantenimientoComponent } from './core/mantenimiento/usuarios/usuarios-mantenimiento/usuarios-mantenimiento.component';
import { ProductosMantenimientoComponent } from './core/mantenimiento/productos/productos-mantenimiento/productos-mantenimiento.component';
import { AlertModule } from '../shared/alert/alert.module';
import { CargaComponent } from './core/mantenimiento/carga/carga.component';
import { ProductosCargaComponent } from './core/mantenimiento/carga/productos-carga/productos-carga.component';
import { FotografiaCargaComponent } from './core/mantenimiento/carga/fotografias-carga/fotografia-carga.component';
import { DocTecnicosCargaComponent } from './core/mantenimiento/carga/docTecnicos-carga/docTecnicos-carga.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        AdminAlertModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ],
    declarations: [ AdminComponent,
                    // HistorialComponent,
                    CategoriasComponent,
                    // PerfilesComponent,
                    // PerfilesMantenimientoComponent,
                    ProductosComponent,
                    ProductosMantenimientoComponent,
                    // CargaComponent,
                    // ProductosCargaComponent,
                    // FotografiaCargaComponent,
                    // DocTecnicosCargaComponent,
                    UsuariosComponent,
                    UsuariosMantenimientoComponent,
                    CambiarcontraseniaComponent,
                    DatosComponent,
                    MispedidosComponent,
                    // PedidosComponent,
                    // ProductosConsultadosComponent,
                    // ProductosVendidosComponent,
                    // TiempoPublicacionComponent,
                    // VentasCompradoresComponent,
                    HeaderAdminComponent,
                    SidebarAdminComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [ NgxSpinnerModule ]
})
export class AdminModule {}
