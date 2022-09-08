import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AdminModalService } from './../../helpers/adminAlert/modal.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;
  isValidatSubmit: boolean;
  isCleanField: boolean;

  categorias: any;
  categoriasActivos: any = [];
  model: Categoria = new Categoria();

  modal: NgbModalRef;
  constructor(private router: Router,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public modalDialogService: AdminModalService,
    public notificationService: NotificationService,
    public categoriaService: CategoriaService) {
  }

  ngOnInit() {
    // Tabla
    this.categorias = [{
      id: 1,
      fechacreacion: '2019-07-26',
      nombre: 'Renovable',
      descripcion: 'Permiten no dañar el medio ambiente',
      estado: 'Activo'
    },
    {
      id: 2,
      fechacreacion: '2019-07-26',
      nombre: 'Potenciador',
      descripcion: 'Generan mayor energia electrica',
      estado: 'Activo'
    }];

    this.registerForm = this.formBuilder.group({
      id: [''],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required]
    });
    this.submitted = false;
    this.isCleanField = false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isValidatSubmit = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.notificationService.showError(this.translate.instant('Debe ingresar valores'), '');
      return;
    }  else {
      this.isValidatSubmit = true;
      // Here go register service

      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      console.log(this.registerForm.value);
      this.limpiarCampos();
    }
  }

  checkAll(ev) {
    this.categorias.forEach(x => x.state = ev.target.checked);
  }

  isAllChecked() {
    return this.categorias.every(_ => _.state);
  }

  eliminaMasiva() {
    for (let index = 0; index < this.categoriasActivos.length; index++) {
      this.categoriasActivos.splice(index);
    }

    for (const key in this.categorias) {
      if (this.categorias[key]['state'] === true) {
        this.categoriasActivos.push(this.categorias[key]['id']);
      }
    }
    console.log(this.categoriasActivos);
  }

  modalEliminarCategoria(id: number) {
    this.modalDialogService.confirm(this.translate.instant('Eliminar Categoria'), this.translate.instant('¿Está seguro que desea eliminar el categoria?'))
      .then((confirmed) => { this.eliminarCategoria(id); })
      .catch(() => console.log('Canceló la operación'));
  }
  // METODO PARA ELIMINAR LA VERSION
  eliminarCategoria(idCategoriaEliminar: number) {
    this.notificationService.showSuccess(this.translate.instant('Se eliminó el categoria con id') + ': ' + idCategoriaEliminar, '');
    this.modal.close();
  }
  getCategoriaById(id: number) {
    this.categoriaService.getCategoriaById(1).subscribe(
      (data) => {
        this.model = data;
        this.registerForm.setValue({
          id: 1,
          categoria: this.model.categoria,
          descripcion: this.model.descripcion,
          estado: this.model.estado
      });
    });
    console.log(id);
  }

  limpiarCampos() {
    this.registerForm.reset();
    this.notificationService.showSuccess(this.translate.instant('Se limpio los campos'), '');
    this.submitted = false;
    this.isCleanField = true;
  }

}
