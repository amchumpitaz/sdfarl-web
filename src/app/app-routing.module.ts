import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // { path: '', loadChildren: './login/login.module#LoginModule' },
    { path: '', loadChildren: './entities/main.module#MainModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'ventas', loadChildren: './entities/main.module#MainModule' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'resetpassword', loadChildren: './resetpassword/resetpassword.module#ResetPasswordModule' },
    { path: 'not-found', loadChildren: './layout/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, {useHash: false})],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
