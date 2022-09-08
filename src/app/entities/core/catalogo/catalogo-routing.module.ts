import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';
import { RegisterComponent } from './register/register.component';
import { SuccessRegisterComponent } from './register/success-register/success-register.component';

const routes: Routes = [
    {
        path: '',
        component: CatalogoComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'register/success',
        component: SuccessRegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogoRoutingModule {}
