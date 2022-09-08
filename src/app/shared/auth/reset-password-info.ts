export class AuthResetPasswordInfo {
    email: string;
    preguntaSecreta: string;
    respuestaSecreta: string;

    constructor(email: string,
        preguntaSecreta: string,
        respuestaSecreta: string) {
        this.email = email;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
    }
}
