// Constantes globales del negocio
export const ANIO_INICIO = 2018;
export const PRIMER_MES_ANIO = 1;
export const MENSAJE_FECHA_INCORRECTA = 'Se ha(n) encontrado fecha(s) que no coinciden ' +
                                        'con la selección actual';
export const MENSAJE_CARGA_ERROR = 'Se ha(n) encontrado incongruencia de datos en el archivo de carga';
export const MENSAJE_ERROR_NO_EJECUTO_PROCESO_DOTACION = 'No se pudo ejecutar el proceso de dotación, ' +
                                                         'por favor intentelo nuevamente';
export const MENSAJE_ERROR_NO_EJECUTO_PROCESO_COSTO = 'No se pudo ejecutar el proceso de costo, ' +
                                                      'por favor intentelo nuevamente';
export const MENSAJE_SUCCESS = 'SUCCESS';
export const MENSAJE_ERROR = 'ERROR';
export const ERROR_CABECERA_ARCHIVO = 'La cabecera del documento es incorrecta';
export const MENSAJE_OK = 'OK';
export const MENSAJE_EJECUTO_PROCESO_DOTACION = 'Se ejecutó correctamente el proceso de Dotación';
export const MENSAJE_EJECUTO_PROCESO_COSTO = 'Se ejecutó correctamente el proceso de Costo';
export const MENSAJE_ERROR_EJECUTAR_DOTACION = 'MENSAJE_ERROR_EJECUTAR_DOTACION';
export const MENSAJE_ERROR_EJECUTAR_COSTO = 'MENSAJE_ERROR_EJECUTAR_COSTO';
export const NO_EXISTE_LINEA_BASE = 'NO_EXISTE_LINEA_BASE';
export const MENSAJE_ERROR_NO_EXISTE_LINEA_BASE = 'No existen datos en la linea base DICIEMBRE 2018 para ejecutar el proceso de Dotación';
export const NO_EXISTE_UNA_VERSION_ABIERTA = 'NO_EXISTE_UNA_VERSION_ABIERTA';
export const MENSAJE_ERROR_NO_EXISTE_VERSION_ABIERTA = 'No existe una versión abierta para ejecutar el proceso de dotación.';
export const ERROR_DE_CARGA = 'Error. Revisar el resultado de carga.';
export const FALTA_INFORMACION_COMBO_RESUMEN = 'Debe cargar el mantenimiento cuenta contable para obtener las opciones';
export const FALTA_INFORMACION_COMBO_AREA = 'Debe cargar el mantenimiento centro costo para obtener las opciones';
export const FALTA_INFORMACION_COSTO_CUENTA = 'Debe cargar el mantenimiento centro costo y cuenta contable para obtener las opciones';

// Constantes de mensajes de duplicados en los mantenimientos
export const CODIGO_CATALOGO_DUPLICADO = 'Existen códigos duplicados';
export const CODIGO_CONTABLE_DUPLICADO = 'Existen cuentas contables duplicadas';
export const CODIGO_CENTROCOSTO_DUPLICADO = 'Existen centro de costos duplicados';
export const CUENTA_CONTABLE_DUPLICADO = 'Existen cuentas contables duplicadas';
export const TIPO_PLAN_DUPLICADO = 'Existen tipo de planes duplicados';

// Constante de mensajes para evaluar datos de plantilla
export const MENSAJE_ERROR_IMPORTACION = 'Ocurrió un error al importar el archivo';
export const MENSAJE_REPORTE_PLANTILLAS_NOT_FOUND = 'No hay datos procesados en la dotación real para el reporte';
export const MENSAJE_REPORTE_PLANTILLAS_FOUND = 'Se ha generado el reporte';
// Constantes de verificacion de informacion en centro costo para dotacion
export const VERIFICACION_CECO = 'Debe tener información en el mantenimiento de centro de costo para el reporte';
export const ERROR_VERIFICACION_CECO = 'Se encontró un error al verificar la información de centro de costo';
// Constante de reportes
export const MENSAJE_ERROR_REPORTE = 'Ocurrio un error al generar el reporte.';
// Constante de mensajes para evaluar datos de dotacion mensual y anual
export const VERIFICAR_ANIO = 2;
export const MENSAJE_REPORTE_ANUAL_NOT_FOUND = 'No hay datos procesados en la dotación anual para el reporte.';
export const MENSAJE_REPORTE_ANUAL_FOUND = 'Se ha generado el reporte.';

export const VERIFICAR_MES = 1;
export const MENSAJE_REPORTE_MENSUAL_NOT_FOUND = 'No hay datos procesados en la dotación mensual para el reporte.';
export const MENSAJE_REPORTE_MENSUAL_FOUND = 'Se ha generado el reporte.';
export const DOTACION_MENSUAL_ANUAL = 'Se ha generado el reporte.';

export const MENSAJE_ELIMINADO_CORRECTAMENTE = 'El registro se eliminó correctamente.';
export const MENSAJE_ERROR_ELIMINAR_REGISTRO = 'Ocurrió un error al eliminar el registro, por favor inténtelo nuevamente.';
export const MENSAJE_ACTUALIZADO_CORRECTAMENTE = 'El registro se actualizó correctamente.';
export const MENSAJE_INGRESO_CORRECTO = 'Se ingreso el registró correctamente.';
export const MENSAJE_ERROR_REGISTRO = 'Ocurrió un error al ingresar el registro, por favor inténtelo nuevamente.';

// Dotación
export const DOTACION = {
  ERROR_PROCESO_PENDIENTE: 'ERROR_PROCESO_PENDIENTE',
  MENSAJE_ERROR_PROCESO_PENDIENTE: 'No se puede ejecutar el proceso de Dotación porque ha sido INICIADO por otro proceso.',
  ERROR_PERIODO_INACTIVIDAD_EXCEDIDO: 'ERROR_PERIODO_INACTIVIDAD_EXCEDIDO',
  MENSAJE_ERROR_PERIODO_INACTIVIDAD_EXCEDIDO: 'El periodo de inactividad ha sido EXCEDIDO, ' +
                                              'Por favor cree una nueva versión e intentelo nuevamente.',
  TRANSFERENCIA_INCORRECTA: 'TRANSFERENCIA_INCORRECTA',
  MENSAJE_ERROR_TRANSFERENCIA_INCORRECTA: 'Ocurrió un error al transferir los archivos de carga.',
  TRANSFERENCIA_CORRECTA: 'TRANSFERENCIA_CORRECTA',
  MENSAJE_TRANSFERENCIA_CORRECTA: 'Etapa 1 de 5<br>Transferencia de archivos de carga correcta.',
  SEGUNDO_PROCESO_CORRECTO: 'SEGUNDO_PROCESO_CORRECTO',
  MENSAJE_SEGUNDO_PROCESO_CORRECTO: 'Etapa 2 de 5<br>Cálculos en el Proceso de Dotación ejecutado con éxito.',
  ERROR_SEGUNDO_PROCESO_INCORRECTO: 'ERROR_SEGUNDO_PROCESO_INCORRECTO',
  MENSAJE_ERROR_SEGUNDO_PROCESO_INCORRECTO: 'Ocurrió un error al ejecutar el primer mes de planificación.',
  TERCER_PROCESO_CORRECTO: 'TERCER_PROCESO_CORRECTO',
  MENSAJE_TERCER_PROCESO_CORRECTO: 'Etapa 3 de 5<br>Planificación a 5 años realizada con éxito.',
  ERROR_TERCER_PROCESO_INCORRECTO: 'ERROR_TERCER_PROCESO_INCORRECTO',
  MENSAJE_ERROR_TERCER_PROCESO_INCORRECTO: 'Ocurrió un error al ejecutar la planificación a 5 años.',
  CUARTO_PROCESO_CORRECTO: 'CUARTO_PROCESO_CORRECTO',
  MENSAJE_CUARTO_PROCESO_CORRECTO: 'Etapa 4 de 5<br>Cálculo Mensual ejecutado con éxito.',
  ERROR_CUARTO_PROCESO_INCORRECTO: 'ERROR_CUARTO_PROCESO_INCORRECTO',
  MENSAJE_ERROR_CUARTO_PROCESO_INCORRECTO: 'Ocurrió un error al ejecutar los cálculos mensuales.',
  QUINTO_PROCESO_CORRECTO: 'QUINTO_PROCESO_CORRECTO',
  MENSAJE_QUINTO_PROCESO_CORRECTO: 'Etapa 5 de 5<br>Cálculo Anual ejecutado con éxito.',
  ERROR_QUINTO_PROCESO_INCORRECTO: 'ERROR_QUINTO_PROCESO_INCORRECTO',
  MENSAJE_ERROR_QUINTO_PROCESO_INCORRECTO: 'Ocurrió un error al ejecutar los cálculos anuales.'
};

// Costos
export const MENSAJE_REPORTE_COSTOS = 'Se ha generado el reporte.';
export const ERROR_REPORTE_COSTOS = 'Se ha producido un error en el reporte.';

export const COSTOS = {
  ERROR_PROCESO_PENDIENTE: 'ERROR_PROCESO_PENDIENTE',
  MENSAJE_ERROR_PROCESO_PENDIENTE: 'No se puede ejecutar el proceso de Costos porque ha sido INICIADO por otro proceso.',
  GENERAR_INFORMACION_COSTOS_CORRECTO: 'GENERAR_INFORMACION_COSTOS_CORRECTO',
  MENSAJE_GENERAR_INFORMACION_COSTOS_CORRECTO: 'Etapa 1 de 5<br>Transferencia de archivos de carga correcta.',
  GENERAR_INFORMACION_COSTOS_INCORRECTO: 'GENERAR_INFORMACION_COSTOS_INCORRECTO.',
  MENSAJE_GENERAR_INFORMACION_COSTOS_INCORRECTO: 'Ocurrió un error al transferir la información de las cargas.',
  CALCULAR_COSTOS_CORRECTO: 'CALCULAR_COSTOS_CORRECTO',
  MENSAJE_CALCULAR_COSTOS_CORRECTO: 'Etapa 2 de 5<br>Proceso de cálculos de costos correcto.',
  CALCULAR_COSTOS_INCORRECTO: 'CALCULAR_COSTOS_INCORRECTO.',
  MENSAJE_CALCULAR_COSTOS_INCORRECTO: 'Ocurrió un error al procesar los cálculos de costos.',
  CALCULAR_COSTO_INDEXADO_CORRECTO: 'CALCULAR_COSTO_INDEXADO_CORRECTO',
  MENSAJE_CALCULAR_COSTO_INDEXADO_CORRECTO: 'Etapa 3 de 5<br>Proceso de cálculos indexados de costos correcto.',
  CALCULAR_COSTO_INDEXADO_INCORRECTO: 'CALCULAR_COSTO_INDEXADO_INCORRECTO.',
  MENSAJE_CALCULAR_COSTO_INDEXADO_INCORRECTO: 'Ocurrió un error al procesar los cálculos indexados de costos.',
  GENERAR_COSTO_CONTABLE_REAL_CORRECTO: 'GENERAR_COSTO_CONTABLE_REAL_CORRECTO',
  MENSAJE_GENERAR_COSTO_CONTABLE_REAL_CORRECTO: 'Etapa 4 de 5<br>Proceso de cálculos de costo contable real correcto.',
  GENERAR_COSTO_CONTABLE_REAL_INCORRECTO: 'GENERAR_COSTO_CONTABLE_REAL_INCORRECTO.',
  MENSAJE_GENERAR_COSTO_CONTABLE_REAL_INCORRECTO: 'Ocurrió un error al procesar los cálculos de costo contable real.',
  GENERAR_COSTO_CONTABLE_INDEXADO_CORRECTO: 'GENERAR_COSTO_CONTABLE_INDEXADO_CORRECTO',
  MENSAJE_GENERAR_COSTO_CONTABLE_INDEXADO_CORRECTO: 'Etapa 5 de 5<br>Proceso de cálculos de costo contable indexado correcto.',
  GENERAR_COSTO_CONTABLE_INDEXADO_INCORRECTO: 'GENERAR_INFORMACION_COSTOS_INCORRECTO.',
  MENSAJE_GENERAR_COSTO_CONTABLE_INDEXADO_INCORRECTO: 'Ocurrió un error al procesar los cálculos de costos contable indexado.',
  PROCESAR_CALCULO_REPORTE_COSTOS_INCORRECTO: 'PROCESAR_CALCULO_REPORTE_COSTOS_INCORRECTO.',
  MENSAJE_PROCESAR_CALCULO_REPORTE_COSTOS_INCORRECTO: 'Ocurrió un error al procesar los cálculos de los reportes.',
  PROCESAR_CALCULO_REPORTE_COSTOS_CORRECTO: 'PROCESAR_CALCULO_REPORTE_COSTOS_CORRECTO',
  MENSAJE_PROCESAR_CALCULO_REPORTE_COSTOS_CORRECTO: 'Etapa 6 de 6<br>Proceso de cálculos de reportes correcto.',
  ERROR_PERIODO_INACTIVIDAD_EXCEDIDO: 'ERROR_PERIODO_INACTIVIDAD_EXCEDIDO',
  MENSAJE_ERROR_PERIODO_INACTIVIDAD_EXCEDIDO: 'El periodo de inactividad ha sido EXCEDIDO, ' +
                                              'Por favor cree una nueva versión e intentelo nuevamente.',
};

export const REPORTE_COSTOS = {
  MENSAJE_REPORTE_DETALLE_PERSONAL_NOT_FOUND : 'No hay información de costos para este reporte',
  MENSAJE_REPORTE_DETALLE_PERSONAL_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_DETALLE_PERSONAL_SOC_NOT_FOUND : 'No hay información para esta sociedad',
  MENSAJE_REPORTE_DETALLE_PERSONAL_TAX_NOT_FOUND : 'No hay información de costos para este Reporte',
  MENSAJE_REPORTE_DETALLE_PERSONAL_TAX_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_DETALLE_PERSONAL_TAX_SOC_NOT_FOUND : 'No hay información para esta sociedad',
  MENSAJE_REPORTE_COSTO_CUENTA_NOT_FOUND : 'No hay información de costos para este Reporte',
  MENSAJE_REPORTE_COSTO_CUENTA_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_COSTO_CUENTA_PARAM_NOT_FOUND : 'No hay información en base a las opciones seleccionadas',
  MENSAJE_REPORTE_COSTO_MENSUAL_ANUAL_NOT_FOUND : 'No hay información de costos para este Reporte',
  MENSAJE_REPORTE_COSTO_MENSUAL_ANUAL_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_COSTO_KPI_NOT_FOUND : 'No hay información de costos para este Reporte',
  MENSAJE_REPORTE_COSTO_KPI_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_COSTO_RESUMEN_NOT_FOUND : 'No hay información de costos para este Reporte',
  MENSAJE_REPORTE_COSTO_RESUMEN_FOUND : 'Se ha generado el reporte solicitado',
  MENSAJE_REPORTE_COSTO_RESUMEN_TD_NOT_FOUND : 'No hay información para este resumen',
  VERIFICAR_DETALLE_PERSONAL : 1,
  VERIFICAR_DETALLE_PERSONAL_TAX : 2,
  VERIFICAR_COSTO_MENSUAL_ANUAL : 3,
  VERIFICAR_COSTO_KPI : 4
};

// Registro de Empresa y Persona Natural
export const TIPO_EMPRESA = 1;
export const TIPO_PERSONA_NATURAL = 2;
export const ERROR_INPUTS_REGISTER = 'Por favor verifique los datos ingresados';
export const DEFAULT_NEW_REGISTER = 0;
export const SUCCESS_SAVE_PASSWORD = 'Se cambió tu contraseña con éxito, en breve recibirás un mensaje de confirmación en tu correo';
// tslint:disable-next-line: max-line-length
export const SUCCESS_SAVE_SECRET_QUESTION = 'Se cambió tu pregunta secreta con éxito, en breve recibirás un mensaje de confirmación en tu correo';
export const SUCCESS_SAVE_EMAIL = 'Se cambió tu correo con éxito, en breve recibirás un mensaje de confirmación en tu correo';
export const SUCCESS_SAVE_DATA = 'Se han actualizado tus datos correctamente, en breve recibirás un mensaje de confirmación en tu correo';
export const ACTIVE = 1;

// Módulo de Carga
export const MENU_PRODUCTOS = 'productos';
export const MENU_FOTOGRAFIA = 'fotografias';
export const MENU_DETALLE_TECNICO = 'doctecnicos';
export const PROCESO_PENDIENTE = 'PENDIENTE';
export const PROCESS_COMPLETED = 'Datos procesados con éxito';
export const VALID_ARCHIVE = 'Estructura de archivo válido';
export const PROCCESSING_DATA = 'Procesando datos';
export const INVALID_ARCHIVE = 'Estructura de archivo inválido';
export const PROCESSING_PROCESS = 'EN PROCESO';

export const DNI = 'DNI';
export const RUC = 'RUC';
export const PASAPORTE = 'PASAPORTE';
export const CARNET_EXTRANJERIA = 'CARNET_EXTRANJERIA';
