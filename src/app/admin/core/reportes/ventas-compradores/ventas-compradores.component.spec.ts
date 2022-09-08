/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentasCompradoresComponent } from './ventas-compradores.component';

describe('VentasCompradoresComponent', () => {
  let component: VentasCompradoresComponent;
  let fixture: ComponentFixture<VentasCompradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasCompradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasCompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
