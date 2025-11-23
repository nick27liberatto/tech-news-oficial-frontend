import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMfaPage } from './setup-mfa-page';

describe('SetupMfaPage', () => {
  let component: SetupMfaPage;
  let fixture: ComponentFixture<SetupMfaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupMfaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupMfaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
