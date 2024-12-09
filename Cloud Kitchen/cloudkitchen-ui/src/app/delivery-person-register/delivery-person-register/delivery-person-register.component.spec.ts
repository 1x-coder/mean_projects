import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonRegisterComponent } from './delivery-person-register.component';

describe('DeliveryPersonRegisterComponent', () => {
  let component: DeliveryPersonRegisterComponent;
  let fixture: ComponentFixture<DeliveryPersonRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
