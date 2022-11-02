import { HistorialComponent } from './core/historial/historial.component';
import { VentasCompradoresComponent } from './core/reportes/ventas-compradores/ventas-compradores.component';
import { ProductosVendidosComponent } from './core/reportes/productos-vendidos/productos-vendidos.component';
import { MispedidosComponent } from './core/mispedidos/mispedidos.component';
import { PedidosComponent } from './core/pedidos/pedidos.component';
import { DatosComponent } from './core/miperfil/datos/datos.component';
import { CambiarcontraseniaComponent } from './core/miperfil/cambiarcontrasenia/cambiarcontrasenia.component';
import { ProductosComponent } from './core/mantenimiento/productos/productos.component';
import { CategoriasComponent } from './core/mantenimiento/categorias/categorias.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './core/mantenimiento/usuarios/usuarios.component';
import { ProductosConsultadosComponent } from './core/reportes/productos-consultados/productos-consultados.component';
import { TiempoPublicacionComponent } from './core/reportes/tiempo-publicacion/tiempo-publicacion.component';
import { UsuariosMantenimientoComponent } from './core/mantenimiento/usuarios/usuarios-mantenimiento/usuarios-mantenimiento.component';
import { CargaComponent } from './core/mantenimiento/carga/carga.component';
import { ProductosCargaComponent } from './core/mantenimiento/carga/productos-carga/productos-carga.component';
import { FotografiaCargaComponent } from './core/mantenimiento/carga/fotografias-carga/fotografia-carga.component';
import { DocTecnicosCargaComponent } from './core/mantenimiento/carga/docTecnicos-carga/docTecnicos-carga.component';
import { ProductosMantenimientoComponent } from './core/mantenimiento/productos/productos-mantenimiento/productos-mantenimiento.component';
import { MovimientosPendientesComponent } from './core/mantenimiento/movimientos-pendientes/movimientos-pendientes.component';
import { MovimientosMantenimientoPendientesComponent } from './core/mantenimiento/movimientos-pendientes/movimientos-mantenimiento-pendientes/movimientos-mantenimiento-pendientes.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            // { path: 'historial', component: HistorialComponent },
            // { path: 'categorias', component: CategoriasComponent },
            { path: 'movimientosPendientes', component: MovimientosPendientesComponent },
            { path: 'movimientosPendientes/mantenimiento', component: MovimientosMantenimientoPendientesComponent },
            { path: 'controles', component: ProductosComponent },
            { path: 'controles/mantenimiento', component: ProductosMantenimientoComponent },
            // { path: 'carga', component: CargaComponent },
            // { path: 'carga/productos', component: ProductosCargaComponent },
            // { path: 'carga/fotografias', component: FotografiaCargaComponent },
            // { path: 'carga/doctecnicos', component: DocTecnicosCargaComponent },
            { path: 'movimientosAsignados', component: UsuariosComponent },
            { path: 'movimientosAsignados/mantenimiento', component: UsuariosMantenimientoComponent },
            { path: 'cambiarcontrasenia', component: CambiarcontraseniaComponent },
            { path: 'datos', component: DatosComponent },
            { path: 'movimiento', component: MispedidosComponent },
            { path: 'reporteria', component: PedidosComponent },
            // { path: 'productos-consultados', component: ProductosConsultadosComponent },
            // { path: 'productos-vendidos', component: ProductosVendidosComponent },
            // { path: 'tiempo-publicacion', component: TiempoPublicacionComponent },
            // { path: 'ventas-compradores', component: VentasCompradoresComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
