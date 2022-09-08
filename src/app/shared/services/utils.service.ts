import { Injectable, Directive } from '@angular/core';
import { ANIO_INICIO } from '../constants/main.constants';

@Injectable()
export class UtilsService {

  mesesAnioActual: any = [];
  anioActual: any = new Date().getFullYear();
  anioProyectado: number;

  constructor() { }

  getYears() {
    const anios: number[] = [];
    for (let i = ANIO_INICIO; i <= this.anioActual; i++) {
      anios.push(i);
    }
    return anios;
  }

  getProjectedYears() {
    const anios: number[] = [];
    this.anioProyectado = this.anioActual + 5;
    for (let i = ANIO_INICIO; i <= this.anioProyectado; i++) {
      anios.push(i);
    }
    return anios;
  }

  getMonths() {
    const months = [
      { 'id' : 1 , 'nombre': 'Enero'},
      { 'id' : 2 , 'nombre': 'Febrero'},
      { 'id' : 3 , 'nombre': 'Marzo'},
      { 'id' : 4 , 'nombre': 'Abril'},
      { 'id' : 5 , 'nombre': 'Mayo'},
      { 'id' : 6 , 'nombre': 'Junio'},
      { 'id' : 7 , 'nombre': 'Julio'},
      { 'id' : 8 , 'nombre': 'Agosto'},
      { 'id' : 9 , 'nombre': 'Setiembre'},
      { 'id' : 10 , 'nombre': 'Octubre'},
      { 'id' : 11 , 'nombre': 'Noviembre'},
      { 'id' : 12 , 'nombre': 'Diciembre'}
    ];
      return months;
  }

  getCodigoTipoEmpleado() {
    const codigoTipoEmpleado = [
      { 'id' : 1 , 'codigo': 'D'},
      { 'id' : 2 , 'codigo': 'Q'},
      { 'id' : 3 , 'codigo': 'I'},
      { 'id' : 4 , 'codigo': 'B'}
    ];
    return codigoTipoEmpleado;
  }

  getTipoAumentoEmpleado() {
    const tipoAumento = [
      { 'id' : 1 , 'tipo': 'Monto'},
      { 'id' : 2 , 'tipo': 'Porcentaje'}
    ];
    return tipoAumento;
  }

  getObtenerMesesxAnio(year: any) {
    this.mesesAnioActual = [];
    // fix: bug no se comparan numbers se setea a string
    const anio: string = year;
    const anio_actual: string = this.anioActual;

    let mesActual: number = new Date().getMonth();
    mesActual = mesActual + 1;
    // se verifica el año actual y sólo se muestra el
    // número meses 'hasta' el mes actual
    if (anio.toString() !== anio_actual.toString()) {
      this.getMonths().forEach((x) => {
        this.mesesAnioActual.push({
          id: x.id,
          nombre: x.nombre
        });
      });
    } else {
        this.getMonths().forEach((e) => {
            if (e.id <= mesActual) {
              this.mesesAnioActual.push({
                            id: e.id,
                            nombre: e.nombre
               });
            }
        });
    }
    return this.mesesAnioActual;
  }
}
