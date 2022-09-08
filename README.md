# Desarrollado en Angular 7 y Bootstrap 4
# Alan Morón 08/02/2019 - Indra

*   boostrap-v4.0.0
*   angular-v7.0.2
*   angular/cli-v7.0.4
*   ng-bootstrap-v4.0.0
*   ngx-translate-v11.0.0

Compatible con node 8.9.0+ y npm 4+

# Cómo correr el proyecto:
una vez clonado, en el directorio de instalación ejecutar `npm install`
para su vizualización ejecutar `npm start` o `ng serve` el proyecto se ejecutará en `http://localhost:4200/`.
cualquier cambio en el aplicativo se refrescará en el navegador.

# Para producción:
cambiar las constantes a QA Enel en `app.constants.ts`
La carpeta de salida estara en `dist`, ejecuta `ng build --prod --base-href=/web/` 

# Para generar un nuevo componente
Ejecutar `ng generate component nombre-componente` se creará el componente en la raiz del aplicativo y se registrará en el componente principal app.module.ts 

# Para correr los test
Ejecutar `ng test` se ejecutan via [Karma]

# Para correr test end-to-end
Ejecutar `ng e2e` se ejecutan via [Protractor]

# se debe instalar el plugin el loader
`npm install ngx-spinner --save-dev`

# paginaciones
`npm install ngx-pagination --save​`

# se debe instalar el plugin para las notificaciones
`npm install ngx-toastr --save-dev`

# selector
`npm install @ng-select/ng-select --save-dev`

# Bugs encontrados al momento de su instalación
Si despues de ejecutar `npm install` aparece un mensaje de error cannot find module webpack.
Ejecutar `npm install --save-dev webpack` y `npm install --save-dev webpack-dev-server`

Si aparece un error despues de instalar el filtro ejecutar el siguiente comando:
`npm install --save-dev @angular-devkit/build-angular`
`npm install ng-image-slider`

# For Captcha
`npm install ngx-captcha --save-dev`

# For Translate Extract
`npm install @biesbjerg/ngx-translate-extract --save-dev`

# For generate js for translate
`npm run extract-i18n`

# by default after run npm run extract-i18n -- json archives may be in D:\Workspace\Ecommerce\ecommerce\DESARROLLO\WEB\ANGULAR\src\i18n 

# if you use `@angular/router` --> Display loading-bar on route navigation
  `npm install @ngx-loading-bar/core @ngx-loading-bar/router --save`
