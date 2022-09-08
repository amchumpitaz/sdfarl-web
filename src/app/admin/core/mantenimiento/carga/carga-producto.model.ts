export class CargaProducto {
    constructor(
        public tipoArchivo?: string,
        public archivo?: any,
        public errores?: any,
        public usuario?: string,
        public nombreArchivo?: string
    )  {  }
}
