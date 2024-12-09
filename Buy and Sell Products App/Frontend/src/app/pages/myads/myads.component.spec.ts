import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyadsComponent } from './myads.component';

describe('MyadsComponent', () => {
  let component: MyadsComponent;
  let fixture: ComponentFixture<MyadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
