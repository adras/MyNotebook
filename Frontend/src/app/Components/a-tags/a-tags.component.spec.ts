import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATagsComponent } from './a-tags.component';

describe('ATagsComponent', () => {
  let component: ATagsComponent;
  let fixture: ComponentFixture<ATagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ATagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ATagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
