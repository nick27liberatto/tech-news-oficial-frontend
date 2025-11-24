import { Routes } from '@angular/router';
import { LoginFormPage } from './containers/login-form-page/login-form-page';
import { RegisterFormPage } from './containers/register-form-page/register-form-page';
import { ForgotPasswordFormPage } from './containers/forgot-password-form-page/forgot-password-form-page';
import { ResetPasswordFormPage } from './containers/reset-password-form-page/reset-password-form-page';
import { HomePage } from './containers/home-page/home-page';
import { authenticatedGuard } from './guards/authenticated-guard';
import { FormPage } from './containers/form-page/form-page';
import { ConfirmEmailPage } from './containers/confirm-email-page/confirm-email-page';
import { SettingsPage } from './containers/settings-page/settings-page';
import { VerifyTotpPage } from './containers/verify-totp-page/verify-totp-page';
import { SetupMfaPage } from './containers/setup-mfa-page/setup-mfa-page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'new',
    component: FormPage
  },
  {
    path: ':id/edit',
    component: FormPage
  },
  {
    path: 'login',
    component: LoginFormPage
  },
  {
    path: 'verify-mfa',
    component: VerifyTotpPage
  },
  {
    path: 'setup-mfa',
    component: SetupMfaPage
  },
  {
    path: 'register',
    component: RegisterFormPage
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailPage
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordFormPage
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormPage
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];