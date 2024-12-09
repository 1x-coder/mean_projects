import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonViewProfileComponent } from './delivery-person-view-profile.component';

describe('DeliveryPersonViewProfileComponent', () => {
  let component: DeliveryPersonViewProfileComponent;
  let fixture: ComponentFixture<DeliveryPersonViewProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonViewProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
