import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotografiaCargaComponent } from './fotografia-carga.component';

const routes: Routes = [
  {
    path: '',
    component: FotografiaCargaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotografiaCargaRoutingModule { }
