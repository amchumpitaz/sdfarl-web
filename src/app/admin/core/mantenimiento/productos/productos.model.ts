export class Producto {
    constructor(
        public id?: number,
        public codigo?: string,
        public titulo?: string,
        public descripcion?: string,
        public categoria?: number,
        public condicion?: number,
        public tecnologia?: number,
        public tipoMoneda?: number,
        public precio?: DoubleRange,
        public cantidad?: number,
        public nombreContacto?: string,
        public correoContacto?: string,
        public lugarRecojo?: number,
        public detalleTecnico?: File,
        public productoDestacado?: boolean,
        public img0?: File,
        public img1?: File,
        public img2?: File,
        public img3?: File,
        public img4?: File
    ) {  }
}
