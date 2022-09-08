import { ProductosComponent } from './productos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosMantenimientoComponent } from './productos-mantenimiento/productos-mantenimiento.component';

const routes: Routes = [
    {
        path: '',
        component: ProductosComponent,
        children: [
            { path: 'mantenimiento', component: ProductosMantenimientoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule {}
