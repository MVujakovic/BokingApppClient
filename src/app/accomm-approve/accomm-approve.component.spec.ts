import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommApproveComponent } from './accomm-approve.component';

describe('AccommApproveComponent', () => {
  let component: AccommApproveComponent;
  let fixture: ComponentFixture<AccommApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
