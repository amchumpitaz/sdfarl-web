export class Producto {
    constructor(
        public id?: number,
        public nivel_riesgo?: string,
        public descripcion?: string,
        public estado?: string,
        public fec_crea?: Date,
        public usr_crea?: string,
        public fec_modifica?: Date,
        public usr_modifica?: string
    ) {  }
}
