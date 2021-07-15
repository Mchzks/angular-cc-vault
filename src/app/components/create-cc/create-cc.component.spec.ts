import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCcComponent } from './create-cc.component';

describe('CreateCcComponent', () => {
  let component: CreateCcComponent;
  let fixture: ComponentFixture<CreateCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
