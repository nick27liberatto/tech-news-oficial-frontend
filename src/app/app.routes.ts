import { Routes } from '@angular/router';
import { LoginFormPage } from './containers/login-form-page/login-form-page';
import { RegisterFormPage } from './containers/register-form-page/register-form-page';
import { ForgotPasswordFormPage } from './containers/forgot-password-form-page/forgot-password-form-page';
import { ListUsersPage } from './containers/list-users-page/list-users-page';

export const routes: Routes = [
  { path: 'login', component: LoginFormPage },
  { path: 'register', component: RegisterFormPage },
  { path: 'forgot-password', component: ForgotPasswordFormPage },
  { path: 'list', component: ListUsersPage },
  { path: '**', redirectTo: 'login' }
];
