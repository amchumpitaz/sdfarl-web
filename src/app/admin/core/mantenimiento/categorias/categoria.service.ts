import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../../../app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

    private baseUrl = SERVER_API_URL + 'api/categoria';
    constructor(private http: HttpClient) { }

    getCategoriaById(id: number): Observable<any> {
      return this.http.get(`http://localhost:4200/assets/categoria.json`);
    }
}
