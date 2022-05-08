import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALogoutComponent } from './a-logout.component';

describe('ALogoutComponent', () => {
  let component: ALogoutComponent;
  let fixture: ComponentFixture<ALogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ALogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ALogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
