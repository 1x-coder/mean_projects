import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantViewFoodComponent } from './restaurant-view-food.component';

describe('RestaurantViewFoodComponent', () => {
  let component: RestaurantViewFoodComponent;
  let fixture: ComponentFixture<RestaurantViewFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantViewFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantViewFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
