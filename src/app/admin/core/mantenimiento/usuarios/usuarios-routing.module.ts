import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosMantenimientoComponent } from './usuarios-mantenimiento/usuarios-mantenimiento.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent,
        children: [
            { path: 'mantenimiento', component: UsuariosMantenimientoComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {}
