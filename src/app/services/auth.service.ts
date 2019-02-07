import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    console.log(email, password);
    return this.httpClient.post<{token: string}>('http://localhost:8000/users/login', {email: email, passwordHash: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          console.log(result.token);
          return result.token;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
