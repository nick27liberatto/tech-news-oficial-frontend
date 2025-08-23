import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api/v1/users'
  
  constructor(private http: HttpClient) { }
  search(filtro:string): Observable<User[]> {
    let params = new HttpParams();
    params = params.set('search', filtro);
    return this.http.get<User[]>(this.apiUrl, {params: params});
  }

  login(user:User): Observable<User[]> {
    var url = new URL(`${this.apiUrl}/login`);
    return this.http.post<User[]>(`${url}`, user);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updatePassword(id: number, user: User): Observable<User> {
    var url = new URL(`${this.apiUrl}/${id}/password/update`);
    return this.http.patch<User>(`${url}`, user);
  }

  recoverPassword(id: number, user: User): Observable<User> {
    var url = new URL(`${this.apiUrl}/${id}/password/recover`);
    return this.http.patch<User>(`${url}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
