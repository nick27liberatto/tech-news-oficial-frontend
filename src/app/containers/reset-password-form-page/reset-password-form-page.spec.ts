import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFormPage } from './reset-password-form-page';

describe('ResetPasswordFormPage', () => {
  let component: ResetPasswordFormPage;
  let fixture: ComponentFixture<ResetPasswordFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
