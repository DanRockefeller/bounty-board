import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEventCardComponent } from './selected-event-card.component';

describe('SelectedEventCardComponent', () => {
  let component: SelectedEventCardComponent;
  let fixture: ComponentFixture<SelectedEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
