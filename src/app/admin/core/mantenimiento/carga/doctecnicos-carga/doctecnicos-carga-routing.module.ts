import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocTecnicosCargaComponent } from './doctecnicos-carga.component';

const routes: Routes = [
  {
    path: '',
    component: DocTecnicosCargaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocTecnicosCargaRoutingModule { }
