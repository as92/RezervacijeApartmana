/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UredisobuComponent } from './uredisobu.component';

describe('UredisobuComponent', () => {
  let component: UredisobuComponent;
  let fixture: ComponentFixture<UredisobuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UredisobuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UredisobuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
