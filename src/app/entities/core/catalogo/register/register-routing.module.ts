import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { SuccessRegisterComponent } from './success-register/success-register.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      { path: 'success', component: SuccessRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
