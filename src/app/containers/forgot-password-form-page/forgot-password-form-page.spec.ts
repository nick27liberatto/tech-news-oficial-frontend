import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordFormPage } from './forgot-password-form-page';

describe('ForgotPasswordFormPage', () => {
  let component: ForgotPasswordFormPage;
  let fixture: ComponentFixture<ForgotPasswordFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
