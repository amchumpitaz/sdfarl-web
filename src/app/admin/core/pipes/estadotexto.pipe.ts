import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadotexto'
})
export class EstadotextoPipe implements PipeTransform {

  transform(value: any): any {
    let newStr = '';
    const estado = [
      { 'id': '0', 'nombre': 'Eliminado' },
      { 'id': '1', 'nombre': 'Activo' },
      { 'id': '2', 'nombre': 'Inactivo' }
    ];
    for (let index = 0; index < estado.length; index++) {
      if (value === estado[index].id) {
        newStr = estado[index].nombre;
        break;
      }
    }
    return newStr;
  }

}
