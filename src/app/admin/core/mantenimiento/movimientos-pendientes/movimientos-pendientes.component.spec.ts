import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosPendientesComponent } from './movimientos-pendientes.component';

describe('MovimientosPendientesComponent', () => {
  let component: MovimientosPendientesComponent;
  let fixture: ComponentFixture<MovimientosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
