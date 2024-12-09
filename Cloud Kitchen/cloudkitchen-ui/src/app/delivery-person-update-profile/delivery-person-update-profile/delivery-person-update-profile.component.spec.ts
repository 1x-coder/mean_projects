import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonUpdateProfileComponent } from './delivery-person-update-profile.component';

describe('DeliveryPersonUpdateProfileComponent', () => {
  let component: DeliveryPersonUpdateProfileComponent;
  let fixture: ComponentFixture<DeliveryPersonUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
