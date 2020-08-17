/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UrediRezervacijuComponent } from './uredi-rezervaciju.component';

describe('UrediRezervacijuComponent', () => {
  let component: UrediRezervacijuComponent;
  let fixture: ComponentFixture<UrediRezervacijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrediRezervacijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrediRezervacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
