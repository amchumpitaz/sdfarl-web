import { DNI, RUC, PASAPORTE, CARNET_EXTRANJERIA } from './../shared/constants/main.constants';
import { FormGroup } from '@angular/forms';

export function validTypeDocument(nroDocumento: string, tipoDocumento: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[nroDocumento];
        const value = control.value;

        const controlTipoDocumento = formGroup.controls[tipoDocumento];
        const valueTipoDocumento = controlTipoDocumento.value;

        if (control.errors === null) {
            if (value !== null && value !== '') {
                if (valueTipoDocumento.toString() === DNI || valueTipoDocumento.toString() === RUC) {
                    const valid = value.match('^[0-9]*$');
                    if (valid == null) {
                        control.setErrors({ isNotNumber: true });
                    } else {
                        control.setErrors(null);
                        if (valueTipoDocumento.toString() === DNI) {
                            if (control.value.length === 8) {
                                control.setErrors(null);
                            } else {
                                control.setErrors({ isLongitudDNI: true });
                            }
                        } else if (valueTipoDocumento.toString() === RUC) {
                            if (control.value.length <= 11 && control.value.length >= 9) {
                                control.setErrors(null);
                            } else {
                                control.setErrors({ isLongitudRUC: true });
                            }
                        }
                    }
                } else if (valueTipoDocumento.toString() === PASAPORTE || valueTipoDocumento.toString() === CARNET_EXTRANJERIA) {
                    const valid = value.match('^[a-zA-Z0-9]+$');
                    if (valid == null) {
                        control.setErrors({ isNotAlphaNumber: true });
                    } else {
                        control.setErrors(null);
                        if (valueTipoDocumento.toString() === PASAPORTE) {
                            if (control.value.length <= 12) {
                                control.setErrors(null);
                            } else {
                                control.setErrors({ isLongitudPASAPORTE: true });
                            }
                        } else if (valueTipoDocumento.toString() === CARNET_EXTRANJERIA) {
                            if (control.value.length <= 12) {
                                control.setErrors(null);
                            } else {
                                control.setErrors({ isLongitudCARNET: true });
                            }
                        }
                    }
                }
            }
        }
    };
}

export function validDocumentInput(event, valueTipoDocumento): boolean {
    const key = document.all ? event.keyCode : event.which;

    // El key 8 hace representacion al suprimir o borrar atras
    if (key === 8) {
        return true;
    }

    if (valueTipoDocumento.toString() === DNI || valueTipoDocumento.toString() === RUC) {
        const pattern = /[0-9]/;
        const finalKey = String.fromCharCode(key);
        if (pattern.test(finalKey)) {
            if (valueTipoDocumento.toString() === DNI) {
                if (event.target.value.length === 8) {
                    return false;
                } else {
                    return true;
                }
            } else if (valueTipoDocumento.toString() === RUC) {
                if (event.target.value.length === 11) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return pattern.test(finalKey);
        }
    } else if (valueTipoDocumento.toString() === PASAPORTE || valueTipoDocumento.toString() === CARNET_EXTRANJERIA) {
        const pattern = /[a-zA-Z0-9]/;
        const finalKey = String.fromCharCode(key);
        if (pattern.test(finalKey)) {
            if (valueTipoDocumento.toString() === PASAPORTE) {
                if (event.target.value.length === 12) {
                    return false;
                } else {
                    return true;
                }
            } else if (valueTipoDocumento.toString() === CARNET_EXTRANJERIA) {
                if (event.target.value.length === 12) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return pattern.test(finalKey);
        }
    }
}

export function validAlphaNumericInput(event): boolean {
    const key = document.all ? event.keyCode : event.which;

    // El key 8 hace representacion al suprimir o borrar atras
    if (key === 8) {
        return true;
    }

    const pattern = /[a-zA-Z0-9 ]|[à-ú ]|[À-Ú ]/;
    const finalKey = String.fromCharCode(key);
    return pattern.test(finalKey);
}

export function validAlphabeticInput(event): boolean {
    const key = document.all ? event.keyCode : event.which;

    // El key 8 hace representacion al suprimir o borrar atras
    if (key === 8) {
        return true;
    }

    const pattern = /[a-zA-Z ]|[à-ú ]|[À-Ú ]/;
    const finalKey = String.fromCharCode(key);
    return pattern.test(finalKey);
}
