import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasPuntuadasComponent } from './mas-puntuadas.component';

describe('MasPuntuadasComponent', () => {
  let component: MasPuntuadasComponent;
  let fixture: ComponentFixture<MasPuntuadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasPuntuadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasPuntuadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
