import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/card.model';
import { DeckModel } from '../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private httpClient: HttpClient) { }


  getAllCards(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/cards');
  }

  getAllFromDeck(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8000/decks/' + id + '/cards');
  }

  getOne(id: number) {
    return this.httpClient.get('http://localhost:8000/cards/' + id);
  }

  save(card: CardModel): Observable<any> {
    return this.httpClient.post('http://localhost:8000/decks/' + card.deckId + '/cards', card);
  }

  edit(card: CardModel): Observable<any> {
    return this.httpClient.put('http://localhost:8000/cards/' + card.id, card);
  }

  delete(card: CardModel) {
    console.log(card.id);
    return this.httpClient.delete('http://localhost:8000/cards/' + card.id);
  }
}
