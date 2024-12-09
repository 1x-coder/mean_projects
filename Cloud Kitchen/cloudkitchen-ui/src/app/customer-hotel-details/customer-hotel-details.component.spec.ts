import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHotelDetailsComponent } from './customer-hotel-details.component';

describe('CustomerHotelDetailsComponent', () => {
  let component: CustomerHotelDetailsComponent;
  let fixture: ComponentFixture<CustomerHotelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerHotelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHotelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
