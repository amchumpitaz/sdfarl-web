import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  public pushRightClass: string;
  constructor(private translate: TranslateService, public router: Router, private tokenStorage: TokenStorageService) {
    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

  changeLang(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

}
