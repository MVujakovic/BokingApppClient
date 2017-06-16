import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAccomComponent } from './search-accom.component';

describe('SearchAccomComponent', () => {
  let component: SearchAccomComponent;
  let fixture: ComponentFixture<SearchAccomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAccomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAccomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
