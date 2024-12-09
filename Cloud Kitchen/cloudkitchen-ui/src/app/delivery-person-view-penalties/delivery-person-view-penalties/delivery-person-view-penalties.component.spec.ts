import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonViewPenaltiesComponent } from './delivery-person-view-penalties.component';

describe('DeliveryPersonViewPenaltiesComponent', () => {
  let component: DeliveryPersonViewPenaltiesComponent;
  let fixture: ComponentFixture<DeliveryPersonViewPenaltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonViewPenaltiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonViewPenaltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
