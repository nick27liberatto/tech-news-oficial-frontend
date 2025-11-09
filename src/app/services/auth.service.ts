import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FluentResult } from '../models/fluent-result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/v1/auth/'

  constructor(private http: HttpClient) { }

  socialLogin(provider: string, token: string) {
    return this.http.post<FluentResult<any>>(this.apiUrl + "social-login", { provider, token });
  }

  login(email: string, password: string) {
    return this.http.post<FluentResult<any>>(this.apiUrl + "login", { email, password });
  }

  register(fullName: string, username: string, email: string, password: string) {
    return this.http.post<FluentResult<any>>(this.apiUrl + "register", { fullName, username, email, password });
  }

  forgotPassword(email: string) {
    return this.http.post<FluentResult<any>>(this.apiUrl + "forgot-password", { email });
  }

  resetPassword(email: string, token: string, newPassword: string) {
    return this.http.post<FluentResult<any>>(this.apiUrl + "reset-password", { email, token, newPassword });
  }
}
