/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarDuringRepairComponent } from './car-during-repair.component';

describe('CarDuringRepairComponent', () => {
  let component: CarDuringRepairComponent;
  let fixture: ComponentFixture<CarDuringRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDuringRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDuringRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
