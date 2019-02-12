import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeckModel } from '../models/deck.model';


@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private httpClient: HttpClient) { }


  getAllDecks(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/decks');
  }

  save(deck: DeckModel): Observable<any> {
    return this.httpClient.post('http://localhost:8000/decks', deck);
  }
}