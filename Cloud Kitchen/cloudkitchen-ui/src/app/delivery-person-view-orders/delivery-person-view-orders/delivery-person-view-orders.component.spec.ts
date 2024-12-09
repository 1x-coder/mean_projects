import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonViewOrdersComponent } from './delivery-person-view-orders.component';

describe('DeliveryPersonViewOrdersComponent', () => {
  let component: DeliveryPersonViewOrdersComponent;
  let fixture: ComponentFixture<DeliveryPersonViewOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonViewOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonViewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
