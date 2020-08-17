/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DodajRezervacijuComponent } from './dodaj-rezervaciju.component';

describe('DodajRezervacijuComponent', () => {
  let component: DodajRezervacijuComponent;
  let fixture: ComponentFixture<DodajRezervacijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajRezervacijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajRezervacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
