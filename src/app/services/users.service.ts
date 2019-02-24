import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }

  getOneUser(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users/` + id);
  }

  newUser(user: UserModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users`, user);
  }

  editUser(user: UserModel): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/users/` + user.id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/users/` + id);
  }

  changePassword(email: string): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/users/login/password`, {email} );
  }
  changeOwnPassword(id: number, password: string)  {
    return this.httpClient.put(`${environment.apiUrl}/users/` + id + '/me', {password});
  }

}
