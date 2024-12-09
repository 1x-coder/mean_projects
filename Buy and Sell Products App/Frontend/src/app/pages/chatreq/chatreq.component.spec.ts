import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatreqComponent } from './chatreq.component';

describe('ChatreqComponent', () => {
  let component: ChatreqComponent;
  let fixture: ComponentFixture<ChatreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
