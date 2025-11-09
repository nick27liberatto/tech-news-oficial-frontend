import { Routes } from '@angular/router';
import { LoginFormPage } from './containers/login-form-page/login-form-page';
import { RegisterFormPage } from './containers/register-form-page/register-form-page';
import { ForgotPasswordFormPage } from './containers/forgot-password-form-page/forgot-password-form-page';
import { ResetPasswordFormPage } from './containers/reset-password-form-page/reset-password-form-page';
import { HomePage } from './containers/home-page/home-page';

export const routes: Routes = [
  {path: 'home', component: HomePage},
  { path: 'login', component: LoginFormPage },
  { path: 'register', component: RegisterFormPage },
  { path: 'forgot-password', component: ForgotPasswordFormPage },
  { path: 'reset-password', component: ResetPasswordFormPage },
  { path: '**', redirectTo: 'home' }
];