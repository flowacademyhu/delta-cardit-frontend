import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private httpClient: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups');
  }

  getAllGroupDecks(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups/' + id + '/decks');
  }

  getOneGroup(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups/' + id);
  }

  newGroup(group: GroupModel): Observable<any> {
    return this.httpClient.post('http://localhost:8000/groups', group);
  }

  editGroup(group: GroupModel): Observable<any> {
    return this.httpClient.put('http://localhost:8000/groups/' + group.id, group);
  }

  deleteGroup(id: number): Observable<any>{
    return this.httpClient.delete('http://localhost:8000/groups/' + id);
  }

  usersByGroupId(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups/' + id + '/users');
  }

  decksByGroupId(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/groups/' + id + '/decks');
  }
}
