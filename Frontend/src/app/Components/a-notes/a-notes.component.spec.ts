import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANotesComponent } from './a-notes.component';

describe('ANotesComponent', () => {
  let component: ANotesComponent;
  let fixture: ComponentFixture<ANotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ANotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ANotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
