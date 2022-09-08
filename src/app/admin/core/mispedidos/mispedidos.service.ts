import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MisPedidosService {

    private baseUrl = SERVER_API_URL + 'api';
    private baseUrlCountry = SERVER_API_URL + 'api/country';
    private baseUrlDeparment = SERVER_API_URL + 'api/deparment';
    private baseUrlProvince = SERVER_API_URL + 'api/province';
    private baseUrlDistrict = SERVER_API_URL + 'api/district';
    private baseUrlMaintTable = SERVER_API_URL + 'api/auth/maintable';
    constructor(private http: HttpClient) { }

    // UPC
    getTipoDeIncidencia(): Observable<any> {
      return this.http.get(`${this.baseUrl}/tiposIncidencia/listar`);
    }

    createIncidencia(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/inference`, data);
    }

    getIncidencias(): Observable<any> {
      return this.http.get(`${this.baseUrl}/incidencia/listar`);
    }

    getIncidenciaId(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/incidencia/${id}`);
    }

    getUser(email: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/usuario/obtenerusuario/${email}`);
    }

    saveimages(file: any, codIn: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/imagen/${codIn}`, file);
    }

    // METODO QUE PERMITE TRAER LOS DATOS DE LA PERSONA POR ID
    getPersonByEmail(email: String): Observable<any> {
      return this.http.get(`${this.baseUrl}/${email}`);
    }

    // METODO QUE PERMITE TRAER LOS DATOS DE LA PERSONA POR ID
    putPersonByEmail(email: String, data: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/update/${email}`, data);
    }

    // METODO QUE PERMITE TRAER LOS PAISES
    getCountries(): Observable<any> {
      return this.http.get(`${this.baseUrlCountry}`);
    }

    // METODO QUE PERMITE TRAER LOS DEPARTAMENTOS
    getDeparments(id: number): Observable<any> {
      return this.http.get(`${this.baseUrlDeparment}/${id}`);
    }

    // METODO QUE PERMITE TRAER LAS PROVINCIAS
    getProvince(id: number): Observable<any> {
      return this.http.get(`${this.baseUrlProvince}/${id}`);
    }

    // METODO QUE PERMITE TRAER LOS DISTRITOS
    getDistrict(id: number): Observable<any> {
      return this.http.get(`${this.baseUrlDistrict}/${id}`);
    }

    // METODO QUE PERMITE TRAER LAS PREGUNTAS SECRETAS
    getQuestion(): Observable<any> {
      return this.http.get(`${this.baseUrlMaintTable}/question`);
    }

    // METODO QUE PERMITE TRAER LOS TIPOS DE DOCUMENTOS DE PERSONA
    getTipDocsPerson(): Observable<any> {
      return this.http.get(`${this.baseUrlMaintTable}/person`);
    }

    // METODO QUE PERMITE TRAER LOS TIPOS DE DOCUMENTOS DE EMPRESA
    getTipDocsCompany(): Observable<any> {
      return this.http.get(`${this.baseUrlMaintTable}/company`);
    }

    // METODO QUE PERMITE TRAER LOS TIPOS DE DOCUMENTOS DE EMPRESA
    getBussinessCore(): Observable<any> {
      return this.http.get(`${this.baseUrlMaintTable}/companycore`);
    }

    // validMatchPassword
    getvalidMatchPassword(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/validPassw`, data);
    }

    // Update password
    updatePassword(data: any) {
      return this.http.put(`${this.baseUrl}/updatePassw`, data);
    }

    // Update SQ
    updateSecretQuestion(data: any) {
      return this.http.put(`${this.baseUrl}/updateSQ`, data);
    }
}