import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantViewRestaurantProfileComponent } from './restaurant-view-restaurant-profile.component';

describe('RestaurantViewRestaurantProfileComponent', () => {
  let component: RestaurantViewRestaurantProfileComponent;
  let fixture: ComponentFixture<RestaurantViewRestaurantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantViewRestaurantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantViewRestaurantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
