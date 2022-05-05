import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASearchComponent } from './a-search.component';

describe('ASearchComponent', () => {
  let component: ASearchComponent;
  let fixture: ComponentFixture<ASearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
