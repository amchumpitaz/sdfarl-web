export class Register {
    constructor(
        public codigo?: number,
        public dni?: string,
        public nombre?: string,
        public apellidoPaterno?: string,
        public apellidoMaterno?: string,
        public sexo?: string,
        public fechaNacimiento?: Date,
        public distrito?: string,
        public provincia?: string,
        public departamento?: string,
        public direccion?: string,
        public email?: string,
        public password?: string,
        public rol?: any
    ) {  }
}
