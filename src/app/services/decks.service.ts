import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeckModel } from '../models/deck.model';
import { group } from '@angular/animations';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private httpClient: HttpClient) { }


  getAllDecks(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/decks`);
  }

  save(deck: DeckModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/decks/`, deck);
  }

  addingDecks(groupId: number, deckId: number): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/groups/` + groupId + '/decks', { deckId: deckId });
  }

  getOne(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/decks/` + id);
  }

  edit(deck: DeckModel): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/decks/` + deck.id, deck);
  }

  deleteGroupDecks(groupId: number, deckId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/groups/` + groupId + '/decks/' + deckId);
  }

  getByGroup(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/groups/` + id + '/decks');
  }
}
