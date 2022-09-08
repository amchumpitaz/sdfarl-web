import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from '../../../../app.constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

    private baseUrl = SERVER_API_URL + 'api/usuario';
    constructor(private http: HttpClient) { }

    // MÉTODO PARA VALIDAR SI CORREO YA SE REGISTRÓ EN LA BD
    // getValidEmailExist(id: number, email: string): Observable<any> {
    //   return this.http.get(`http://localhost:4200/assets/pruebas/validCorreo.json`);
    // }

    createPerson(person: Object): Observable<any> {
      return this.http.post(`${this.baseUrl}`, person, httpOptions);
    }
}
