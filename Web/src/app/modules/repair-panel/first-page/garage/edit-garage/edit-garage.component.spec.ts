/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditGarageComponent } from './edit-garage.component';

describe('EditGarageComponent', () => {
  let component: EditGarageComponent;
  let fixture: ComponentFixture<EditGarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGarageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
