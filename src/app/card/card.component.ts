import { Component, OnInit } from '@angular/core';
import { CardModel } from '../models/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: CardModel[] = [];

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    });
  }


}
