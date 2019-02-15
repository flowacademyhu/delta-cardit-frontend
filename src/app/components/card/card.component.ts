import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: CardModel[] = [];

  public card: CardModel;

  public id: number;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    });
    this.id = 1;
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
  }

  getRandom() {
    const min = 1;
    const max = this.cards.length;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  next() {
    console.log(this.id);
    if (this.id <= this.cards.length + 1) {
      this.id += 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
  }

  prev() {
    if (this.id >= 1) {
      this.id -= 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
  }


}
