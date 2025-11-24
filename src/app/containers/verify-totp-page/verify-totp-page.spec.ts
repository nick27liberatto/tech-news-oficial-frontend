import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTotpPage } from './verify-totp-page';

describe('VerifyTotpPage', () => {
  let component: VerifyTotpPage;
  let fixture: ComponentFixture<VerifyTotpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyTotpPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyTotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
