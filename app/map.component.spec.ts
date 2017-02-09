import { MapComponent } from './map.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule  } from '@angular/router/testing';
import { MyDateRangePickerModule } from 'mydaterangepicker';


describe('MapComponetn', function () {
  let de: DebugElement;
  let map: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    map = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should be truthy', () => expect(map).toBeTruthy())
});
