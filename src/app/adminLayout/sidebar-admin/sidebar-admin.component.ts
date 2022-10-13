import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Menu } from './menu';
import { MisPedidosService } from '../../admin/core/mispedidos/mispedidos.service';
import { TokenStorageService } from 'src/app/shared/auth/token-storage.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  menus: any;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  constructor(private translate: TranslateService,
      public router: Router,
      private misPedidosService: MisPedidosService,
      public tokenStorage: TokenStorageService
    ) {
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
    this.isActive = false;
    this.collapsed = false;
    // Valid if exist menu item before refreshin page
    this.showMenu = sessionStorage.getItem('menuActive') !== null ? sessionStorage.getItem('menuActive') : '';
    this.pushRightClass = 'push-right';
    this.misPedidosService.getRecursos(this.tokenStorage.getUsername()).subscribe(
      (data) => {
        console.log(data);
        this.menus = data;
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
  }


  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
      // we storage menu item active for refreshing case
      sessionStorage.setItem('menuActive', this.showMenu);
    } else {
      this.showMenu = element;
      // we storage menu item active for refreshing case
      sessionStorage.setItem('menuActive', this.showMenu);
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
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

  changeLang(language: string) {
    this.translate.use(language);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

}
