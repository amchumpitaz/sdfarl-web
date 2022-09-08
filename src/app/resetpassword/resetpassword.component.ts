import { Router } from '@angular/router';
import { AuthResetPasswordInfo } from './../shared/auth/reset-password-info';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  form: any = {};
  isResetPasswordIn = true;
  isResetPasswordFailed = false;
  errorMessage = '';
  preguntaSecreta: any;
  data: any;
  private resetPasswordInfo: AuthResetPasswordInfo;

  constructor(
    private translate: TranslateService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.data =  [{
      id: 1,
      pregunta: this.translate.instant('¿CUAL ES TU POSTRE FAVORITO?')
      },
      {
      id: 2,
      pregunta: this.translate.instant('¿CUAL ES TU LUGAR ESPECIAL?')
     }];
    this.preguntaSecreta = 1;
  }

  onSubmit() {
    this.resetPasswordInfo = new AuthResetPasswordInfo(
      this.form.email,
      this.preguntaSecreta,
      this.form.respuestaSecreta);
    console.log(this.resetPasswordInfo);
    this.redirectSystem();
}

  reloadPage() {
    window.location.reload();
  }

  redirectSystem() {
    this.router.navigate(['/login']);
  }

}
