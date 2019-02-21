import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';
import { UserModel } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  private token: string;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('current_user')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = localStorage.getItem('jwt_token');
    console.log(this.token);
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    console.log(email, password);
    return this.httpClient.post<any>('http://localhost:8000/users/login', { email: email, password: password })
      .pipe(
        map(result => {
          this.token = result.token;
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(this.token);
          if (result && result.token) {
            localStorage.setItem('current_user', JSON.stringify(decodedToken));
            localStorage.setItem('jwt_token', result.token);
            localStorage.setItem('role', decodedToken.role);
            this.currentUserSubject.next(decodedToken);
          }
          return result;
        }));
      }

  getToken(): string {
    return this.token;
  }

  logout() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
    this.token = null;
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('current_user') !== null);
  }
}
