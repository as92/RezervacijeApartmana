/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RezervacijeComponent } from './rezervacije.component';

describe('RezervacijeComponent', () => {
  let component: RezervacijeComponent;
  let fixture: ComponentFixture<RezervacijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezervacijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
