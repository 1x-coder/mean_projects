import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeliveryPersonsComponent } from './admin-delivery-persons.component';

describe('AdminDeliveryPersonsComponent', () => {
  let component: AdminDeliveryPersonsComponent;
  let fixture: ComponentFixture<AdminDeliveryPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeliveryPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeliveryPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
