import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReportComponent } from './flight-report.component';

describe('UserProfileComponent', () => {
  let component: FlightReportComponent;
  let fixture: ComponentFixture<FlightReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
