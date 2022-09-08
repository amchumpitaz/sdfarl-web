import { Component, OnInit  } from '@angular/core';
import { TokenStorageService } from './shared/auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService,
    public loader: LoadingBarService,
    private translate: TranslateService) {
      if (localStorage.getItem('lang') === null || localStorage.getItem('lang') === '') {
          this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
          this.translate.setDefaultLang('es');
          const browserLang = this.translate.getBrowserLang();
          this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'es');
          localStorage.setItem('lang', this.translate.currentLang);
      } else {
        this.translate.setDefaultLang(localStorage.getItem('lang'));
        this.translate.use(localStorage.getItem('lang'));
      }
    }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
        this.roles = this.tokenStorage.getAuthorities();
        this.roles.every(role => {
          if (role === 'ROLE_ADMIN') {
            this.authority = 'admin';
            return false;
          }
         this.authority = 'user';
        return true;
      });
    }
  }
}
