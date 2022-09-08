import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocTecnicosCargaComponent } from './doctecnicos-carga.component';


describe('DocTecnicosCargaComponent', () => {
  let component: DocTecnicosCargaComponent;
  let fixture: ComponentFixture<DocTecnicosCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTecnicosCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTecnicosCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
