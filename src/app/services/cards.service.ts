import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/card.model';
import { DeckModel } from '../models/deck.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private httpClient: HttpClient) { }


  getAllCards(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/cards`);
  }

  getAllFromDeck(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/decks/` + id + '/cards');
  }

  getOne(id: number) {
    return this.httpClient.get(`${environment.apiUrl}/cards/` + id);
  }

  save(card: CardModel): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/cards`, card);
  }

  edit(card: CardModel): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/cards/` + card.id, card);
  }

  delete(card: CardModel) {
    console.log(card.id);
    return this.httpClient.delete(`${environment.apiUrl}/cards/` + card.id);
  }
}
