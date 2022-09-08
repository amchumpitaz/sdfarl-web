import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
 } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { TranslateService } from '@ngx-translate/core';

 @Injectable()
 export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public notificationService: NotificationService,
              public router: Router,
              public translate: TranslateService,
              public token: TokenStorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.log(JSON.stringify(error, null, 2));
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            if (error.status === 401) {
              // console.log('401 client side');
            }
            if (error.status === 403) {
              // console.log('403 client side');
            }
          } else {
            // server-side error
            if (error.status === 401) {
              // console.log('401 server side');
              this.notificationService.showError(this.translate.instant('Usuario No autorizado'), '');
              this.token.signOut();
              this.router.navigate(['/login']);
            }
            if (error.status === 403) {
              // console.log('403 server side');
            }
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.log('errorMessage: ' + errorMessage);
            if (error.status === 0) {
              this.notificationService.showError(this.translate.instant('No se pudo establecer la conexión con el servidor'), '');
            }
          }
          return throwError(errorMessage);
        })
      );
  }
 }
