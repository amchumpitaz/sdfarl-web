export class CargaError {
   constructor(
        public resultadoId?: number,
        public regFallidos?: number,
        public regCorrectos?: number,
        public totalRegistros?: number,
        public estado?: string,
        public codigoCarga?: any,
        public tipoCarga?: string,
        public detalleCarga?: string,
        public fechaCreacion?: any
    ) {  }
}
