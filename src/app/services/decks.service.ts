import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeckModel } from '../models/deck.model';
import { group } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private httpClient: HttpClient) { }


  getAllDecks(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/decks');
  }

  save(deck: DeckModel): Observable<any> {
    return this.httpClient.post('http://localhost:8000/decks/', deck);
  }

  getOne(id: number) {
    return this.httpClient.get('http://localhost:8000/decks/' + id);
  }

  edit(deck: DeckModel): Observable<any> {
    return this.httpClient.put('http://localhost:8000/decks/' + deck.id, deck);
  }

  getByGroup(id: number): Observable<any> {
    return this. httpClient.get('http://localhost:8000/groups/' + id + '/decks');
  }
}
