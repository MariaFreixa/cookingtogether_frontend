import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarRecetaComponent } from './crear-editar-receta.component';

describe('CrearEditarRecetaComponent', () => {
  let component: CrearEditarRecetaComponent;
  let fixture: ComponentFixture<CrearEditarRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
