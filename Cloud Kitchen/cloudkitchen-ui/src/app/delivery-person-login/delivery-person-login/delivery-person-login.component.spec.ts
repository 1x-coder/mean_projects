import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonLoginComponent } from './delivery-person-login.component';

describe('DeliveryPersonLoginComponent', () => {
  let component: DeliveryPersonLoginComponent;
  let fixture: ComponentFixture<DeliveryPersonLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
