import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRecetasComponent } from './mis-recetas.component';

describe('MisRecetasComponent', () => {
  let component: MisRecetasComponent;
  let fixture: ComponentFixture<MisRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
