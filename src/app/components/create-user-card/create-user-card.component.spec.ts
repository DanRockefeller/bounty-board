import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserCardComponent } from './create-user-card.component';

describe('CreateUserCardComponent', () => {
  let component: CreateUserCardComponent;
  let fixture: ComponentFixture<CreateUserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
