import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  collapedSideBar: boolean;
  constructor(private userService: UserService,
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
    // this.userService.getAdminBoard().subscribe(
    //   data => {
    //     this.board = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  receiveCollapsed($event: any) {
    this.collapedSideBar = $event;
}
}
