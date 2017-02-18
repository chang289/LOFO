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
  it('should init', () => expect(map).toBeDefined() );

  it('should be truthy', () => expect(map).toBeTruthy());

  it('should always have only one newMarker', () => expect(map.markers.length).toBe(map.posts.length));

  it('should always disappear when close', () => expect(map.newMarker).toBe(null));

  it('should have expected infowindow', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toBe(map.post.fullname);
  });

  it('should close the side nav bar', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    map.clickedMarker
    expect(map.clickedMarker).toBeDefined();
  });

});
