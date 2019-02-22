import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { identifierModuleUrl } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private httpClient: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups`);
  }

  getAllGroupDecks(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/` + id + '/decks');
  }

  getOneGroup(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/` + id);
  }

  newGroup(group: GroupModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/groups`, group);
  }

  editGroup(group: GroupModel): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/groups/` + group.id, group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/groups/` + id);
  }

  usersByGroupId(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/` + id + '/users');
  }

  decksByGroupId(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/` + id + '/decks');
  }
}
