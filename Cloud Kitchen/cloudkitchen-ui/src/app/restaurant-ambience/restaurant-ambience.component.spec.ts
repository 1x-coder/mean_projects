import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAmbienceComponent } from './restaurant-ambience.component';

describe('RestaurantAmbienceComponent', () => {
  let component: RestaurantAmbienceComponent;
  let fixture: ComponentFixture<RestaurantAmbienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantAmbienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAmbienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
