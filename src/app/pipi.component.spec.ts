import { PipiComponent } from './pipi.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule  } from '@angular/router/testing';
import { MyDateRangePickerModule } from 'mydaterangepicker';


describe('PipiComponent', function () {
  let de: DebugElement;
  let map: PipiComponent;
  let fixture: ComponentFixture<PipiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipiComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipiComponent);
    map = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should be very pi guai', () => expect(map).toBeTruthy())
});