import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';

import { AuthService } from '../shared/auth/auth.service';
import { TokenStorageService } from '../shared/auth/token-storage.service';
import { AuthLoginInfo } from '../shared/auth/login-info';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    private loginInfo: AuthLoginInfo;

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        public router: Router
        ) {
        }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
          }
         if (this.isLoggedIn) {
          //  console.log('se encuentra logueado');
           this.router.navigate(['/admin']);
         }
    }

    onSubmit() {
        this.loginInfo = new AuthLoginInfo(
          this.form.username,
          this.form.password);
          console.log(this.loginInfo);
        this.authService.attemptAuth(this.loginInfo).subscribe(
          data => {
            // this.tokenStorage.saveToken(data.accessToken);
            console.log(data);
            if (data != null) {
              this.tokenStorage.saveUsername(data.user.usuario);
              this.tokenStorage.saveAuthorities(data.roles); // HERE FOR ROLES
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getAuthorities();
              this.redirectSystem();
            } else {
              this.errorMessage = 'Usuario no encontrado';
              this.isLoginFailed = true;
            }
          },
          error => {
            console.log(error);
            this.errorMessage = error;
            this.isLoginFailed = true;
          }
        );
    }

    reloadPage() {
        window.location.reload();
    }
    redirectSystem() {
        this.router.navigate(['/admin']);
    }
}
