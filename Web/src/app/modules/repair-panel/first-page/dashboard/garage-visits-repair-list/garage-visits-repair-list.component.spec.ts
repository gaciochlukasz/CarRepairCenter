/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GarageVisitsRepairListComponent } from './garage-visits-repair-list.component';

describe('GarageVisitsRepairListComponent', () => {
  let component: GarageVisitsRepairListComponent;
  let fixture: ComponentFixture<GarageVisitsRepairListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageVisitsRepairListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageVisitsRepairListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
