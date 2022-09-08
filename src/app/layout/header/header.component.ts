import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../../shared/auth/token-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    info: any;

    constructor(private translate: TranslateService,
                public router: Router,
                private token: TokenStorageService) {

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
        this.info = {
          token: this.token.getToken(),
          username: this.token.getUsername(),
          authorities: this.token.getAuthorities()
        };
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
      this.token.signOut();
    }

    changeLang(language: string) {
        this.translate.use(language);
        localStorage.setItem('lang', language);
        console.log(language);
        console.log(localStorage.getItem('lang'));
    }
}
