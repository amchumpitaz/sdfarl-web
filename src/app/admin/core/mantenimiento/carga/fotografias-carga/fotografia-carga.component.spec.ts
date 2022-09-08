import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FotografiaCargaComponent } from './fotografia-carga.component';


describe('FotografiaCargaComponent', () => {
  let component: FotografiaCargaComponent;
  let fixture: ComponentFixture<FotografiaCargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotografiaCargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotografiaCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
