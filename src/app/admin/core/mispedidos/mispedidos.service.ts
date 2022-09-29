import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MisPedidosService {

    messages: any;

    private baseUrl = SERVER_API_URL + 'api';
    private baseUrlCountry = SERVER_API_URL + 'api/country';
    private baseUrlDeparment = SERVER_API_URL + 'api/deparment';
    private baseUrlProvince = SERVER_API_URL + 'api/province';
    private baseUrlDistrict = SERVER_API_URL + 'api/district';
    private baseUrlMaintTable = SERVER_API_URL + 'api/auth/maintable';
    constructor(private http: HttpClient) { }

    // SDFARL
    getObtenerOperadores(body): Observable<any> {
      return this.http.post(`${this.baseUrl}/security/consultar_rol_usuario`, body);
    }

    asignarOperadores(body): Observable<any> {
      return this.http.post(`${this.baseUrl}/security/asignar_movimiento_usuario`, body);
    }

    getControles(): Observable<any> {
      return this.http.get(`${this.baseUrl}/controles`);
    }

    getNivelesRiesgo(): Observable<any> {
      return this.http.get(`${this.baseUrl}/nivelesRiesgo`);
    }

    getControlId(id: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/control/${id}`);
    }

    createControl(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/control/add`, data);
    }

    updateControl(data: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/control/update`, data);
    }

    deleteControlId(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/control/${id}`);
    }

    getmovimientoAsignado(body): Observable<any> {
      return this.http.post(`${this.baseUrl}/mostrar/movimiento_asignado`, body);
    }

    getListaMovimientosAsignados(body): Observable<any> {
      return this.http.post(`${this.baseUrl}/listar/movimientos_asignados`, body);
    }

    getRecursos(usuario: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/security/get_acceso/${usuario}`);
    }

    createIncidencia(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/inference`, data);
    }

    updateIncidencia(data: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/actualizarMovimiento`, data);
    }

    // UPC
    getTipoDeIncidencia(): Observable<any> {
      return this.http.get(`${this.baseUrl}/tiposIncidencia/listar`);
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
