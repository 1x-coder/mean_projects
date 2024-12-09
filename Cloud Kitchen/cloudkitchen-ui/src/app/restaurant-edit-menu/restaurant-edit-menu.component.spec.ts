import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEditMenuComponent } from './restaurant-edit-menu.component';

describe('RestaurantEditMenuComponent', () => {
  let component: RestaurantEditMenuComponent;
  let fixture: ComponentFixture<RestaurantEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
