import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManageOrderComponent } from './restaurant-manage-order.component';

describe('RestaurantManageOrderComponent', () => {
  let component: RestaurantManageOrderComponent;
  let fixture: ComponentFixture<RestaurantManageOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantManageOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantManageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
