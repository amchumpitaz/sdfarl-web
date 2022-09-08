import { CambiarcontraseniaComponent } from './cambiarcontrasenia.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: CambiarcontraseniaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CambiarcontraseniaRoutingModule {}
