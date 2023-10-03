import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFaltaComponent } from './lista-falta.component';

describe('ListaFaltaComponent', () => {
  let component: ListaFaltaComponent;
  let fixture: ComponentFixture<ListaFaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFaltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
