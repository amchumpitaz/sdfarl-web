export class Usuario {
    constructor(
        public usuarioid?: number,
        public perfil?: string,
        public email?: string,
        public nombre?: string,
        public apellidos?: string,
        public apellidopaterno?: string,
        public apellidomaterno?: string,
        public pais?: string,
        public empresa?: string,
        public tipodocumento?: string,
        public nrodocumento?: string
    ) {  }
}
