import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasRecetasComponent } from './ultimas-recetas.component';

describe('UltimasRecetasComponent', () => {
  let component: UltimasRecetasComponent;
  let fixture: ComponentFixture<UltimasRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
