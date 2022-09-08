import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

    private baseUrl = SERVER_API_URL + 'api/catalogo';
    constructor(private http: HttpClient) { }
}
