import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/users');
  }

  getOneUser(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/users/' + id);
  }

  newUser(user: UserModel): Observable<any> {
    return this.httpClient.post('http://localhost:8000/users', user);
  }

  editUser(user: UserModel): Observable<any> {
    return this.httpClient.put('http://localhost:8000/users/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete('http://localhost:8000/users/' + id);
  }

  changeOwnPassword(id: number, password: string)  {
    return this.httpClient.put('http://localhost:8000/users/' + id + '/me', {password});
  }

}
