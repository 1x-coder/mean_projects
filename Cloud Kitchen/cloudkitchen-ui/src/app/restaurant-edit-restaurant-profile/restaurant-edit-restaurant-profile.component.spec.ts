import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEditRestaurantProfileComponent } from './restaurant-edit-restaurant-profile.component';

describe('RestaurantEditRestaurantProfileComponent', () => {
  let component: RestaurantEditRestaurantProfileComponent;
  let fixture: ComponentFixture<RestaurantEditRestaurantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantEditRestaurantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEditRestaurantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
