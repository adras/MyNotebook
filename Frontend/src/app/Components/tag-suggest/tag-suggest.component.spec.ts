import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSuggestComponent } from './tag-suggest.component';

describe('TagSuggestComponent', () => {
  let component: TagSuggestComponent;
  let fixture: ComponentFixture<TagSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
