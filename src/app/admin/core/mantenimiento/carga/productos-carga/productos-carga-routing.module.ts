import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosCargaComponent } from './productos-carga.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosCargaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosCargaRoutingModule { }
