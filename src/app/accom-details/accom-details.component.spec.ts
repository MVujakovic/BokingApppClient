import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomDetailsComponent } from './accom-details.component';

describe('AccomDetailsComponent', () => {
  let component: AccomDetailsComponent;
  let fixture: ComponentFixture<AccomDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
