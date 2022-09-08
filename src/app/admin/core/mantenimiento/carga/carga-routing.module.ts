import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './carga.component';
import { ProductosCargaComponent } from './productos-carga/productos-carga.component';
import { FotografiaCargaComponent } from './fotografias-carga/fotografia-carga.component';
import { DocTecnicosCargaComponent } from './docTecnicos-carga/docTecnicos-carga.component';

const routes: Routes = [
    {
        path: '',
        component: CargaComponent,
        children: [
            { path: 'productos', component: ProductosCargaComponent},
            { path: 'fotografias', component: FotografiaCargaComponent},
            { path: 'doctecnicos', component: DocTecnicosCargaComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CargaRoutingModule {}
