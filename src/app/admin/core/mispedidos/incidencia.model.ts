export class Incidencia {
    constructor(
        public codigo?: number,
        public tipo?: any,
        public descripcion?: string,
        public direccion?: string,
        public distrito?: string,
        public provincia?: string,
        public pais?: string,
        public fechaCreacion?: Date,
        public estado?: string,
        public usuario?: any
    ) {  }
}
