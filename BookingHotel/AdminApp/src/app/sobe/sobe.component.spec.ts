/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SobeComponent } from './sobe.component';

describe('SobeComponent', () => {
  let component: SobeComponent;
  let fixture: ComponentFixture<SobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
