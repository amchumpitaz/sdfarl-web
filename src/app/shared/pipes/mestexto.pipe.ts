import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mestexto'
})
export class MestextoPipe implements PipeTransform {

  transform(value: any): any {
    let newStr = '';
    const months = [
      { 'id': 1, 'nombre': 'Enero' },
      { 'id': 2, 'nombre': 'Febrero' },
      { 'id': 3, 'nombre': 'Marzo' },
      { 'id': 4, 'nombre': 'Abril' },
      { 'id': 5, 'nombre': 'Mayo' },
      { 'id': 6, 'nombre': 'Junio' },
      { 'id': 7, 'nombre': 'Julio' },
      { 'id': 8, 'nombre': 'Agosto' },
      { 'id': 9, 'nombre': 'Setiembre' },
      { 'id': 10, 'nombre': 'Octubre' },
      { 'id': 11, 'nombre': 'Noviembre' },
      { 'id': 12, 'nombre': 'Diciembre' }
    ];
    for (let index = 0; index < months.length; index++) {
      if (value === months[index].id) {
        newStr = months[index].nombre;
        break;
      }
    }
    return newStr;
  }
}
