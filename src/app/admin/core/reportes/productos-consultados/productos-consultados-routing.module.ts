import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosConsultadosComponent } from './productos-consultados.component';

const routes: Routes = [
    {
        path: '',
        component: ProductosConsultadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosConsultadosRoutingModule {}
