import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosCargaComponent } from './productos-carga.component';


describe('ProductosCargaComponent', () => {
  let component: ProductosCargaComponent;
  let fixture: ComponentFixture<ProductosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
