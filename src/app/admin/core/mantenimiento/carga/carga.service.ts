import { retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

    private baseUrl = SERVER_API_URL + 'api/carga';
    constructor(private http: HttpClient) { }

  // METODO QUE PERMITE TRAER LA LISTA DE LAS CARGAS A REALIZAR
  getCargaArchivo(): Observable<any> {
    // return this.http.get(`${this.baseUrl}`);
    return this.http.get(`http://localhost:4200/assets/pruebas/archivoCarga.json`);
  }

  // METODO QUE PERMITE TRAER LA LISTA DE LAS CARGAS A REALIZAR
  donwloadExcelCargaError(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/descargar-archivo-error/${id}`, {responseType: 'blob'});
  }

  // METODO PARA LISTAR EL HISTORIAL DE CARGA
  getHistorial(anio: number, mes: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/historial/${anio}/${mes}`);
  }

  // METODO PARA EXPORTAR EL HISTORIAL DE CARGA DEPENDIENDO AL TIEMPO SOLICITADO
  getDescargaarchivo(anio: number, mes: number, tipotabla: string, fecha: string, nroCarga: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/descargar-archivo/${anio}/${mes}/${tipotabla}/${fecha}/${nroCarga}`, {responseType: 'blob'});
  }
  // METODO PARA ELIMINAR EL HISTORIAL DE UNA CARGA
  deleteHistorial(tacaid: number, tipotabla: string, anio: number, mes: number) {
    return this.http.delete(`${this.baseUrl}/delete-historial/${tacaid}/${tipotabla}/${anio}/${mes}`);
  }

  // METODO PARA ENVIAR DATOS DE CARGA
  createCarga(carga: Object): Observable<any> {
    const req = new HttpRequest('POST', `${this.baseUrl}/create`, carga, {
      reportProgress: true, responseType: 'json'
    });
    return this.http.request(req);
  }

  // METODO PARA OBTENER LOS RESULTADOS DE LA CARGA DEL SERVICE
  getCargaArchivoError(): Observable<any> {
    return this.http.get(`${this.baseUrl}/archivo-error`);
  }

}
