import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private httpClient: HttpClient) { }


  getAllCards(): Observable<any> {
    return this.httpClient.get('http://localhost:8000/cards');
  }
}

