import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlertModule } from './admin/core/helpers/adminAlert/adminAlert.module';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy, } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { httpInterceptorProviders } from './shared/auth/auth-interceptor';
import { HttpErrorInterceptor } from './shared/auth/auth-error-interceptor';

import { UtilsService } from './shared/services/utils.service';
import { DosDigitosDecimalesDirective } from './shared/directives/dos-digitos-decimales.directive';
import { ValoresNumericosDirective } from './shared/directives/valores-numericos.directive';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
   imports: [
      CommonModule,
      ChartsModule,
      NgxChartsModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
      HttpClientModule,
      AdminAlertModule,
      LoadingBarRouterModule,
      TranslateModule.forRoot({
         loader: {
             provide: TranslateLoader,
             useFactory: createTranslateLoader,
             deps: [HttpClient]
         }
     }),
     AppRoutingModule,
        ToastrModule.forRoot({
          maxOpened: 7  /* Número máximo de mensajes que el usuario puede visualizar */
        })
   ],
   declarations: [
      AppComponent,
                    HomeComponent,
                    UserComponent,
                    DosDigitosDecimalesDirective,
                    ValoresNumericosDirective,
                    SidebarComponent,
                    HeaderComponent
   ],
    exports: [ DosDigitosDecimalesDirective, ValoresNumericosDirective ],
    providers: [AuthGuard, UtilsService, httpInterceptorProviders, AdminAlertModule,
                // { provide: ErrorHandler, useClass: AuthErrorHandler },
                // {provide: LocationStrategy, useClass: HashLocationStrategy},
                {provide: LocationStrategy, useClass: PathLocationStrategy},
                { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
