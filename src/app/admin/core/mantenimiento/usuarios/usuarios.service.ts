import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../../../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private baseUrl = SERVER_API_URL + 'api/usuario';
    // variable de transferencia
    private messages: number;
    constructor(private http: HttpClient) { }

    // MÉTODO PARA VALIDAR SI CORREO YA SE REGISTRÓ EN LA BD
    getValidEmailExist(id: number, email: string): Observable<any> {
      return this.http.get(`http://localhost:4200/assets/usuario.json`);
    }

    getUsuarioById(id: number): Observable<any> {
      return this.http.get(`http://localhost:4200/assets/usuario.json`);
    }

    // Comunicacion entre componentes
    add(message: number) {
      this.messages = message;
    }

    get() {
      return this.messages;
    }

    clear() {
      this.messages = undefined;
    }
}
