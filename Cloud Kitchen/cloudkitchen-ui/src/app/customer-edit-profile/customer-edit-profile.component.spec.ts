import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditProfileComponent } from './customer-edit-profile.component';

describe('CustomerEditProfileComponent', () => {
  let component: CustomerEditProfileComponent;
  let fixture: ComponentFixture<CustomerEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
