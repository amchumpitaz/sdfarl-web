import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosMantenimientoPendientesComponent } from './movimientos-mantenimiento-pendientes.component';

describe('MovimientosMantenimientoPendientesComponent', () => {
  let component: MovimientosMantenimientoPendientesComponent;
  let fixture: ComponentFixture<MovimientosMantenimientoPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosMantenimientoPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosMantenimientoPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
