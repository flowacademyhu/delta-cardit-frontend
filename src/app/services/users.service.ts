import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/users');
  }

  getAllGroups(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups');
  }
}
