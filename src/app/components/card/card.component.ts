import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { all } from 'q';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: CardModel[] = [];

  public card: CardModel;

  public id: number;

  public answers: string = null;

  public numberOfCards: number = null;

  public isRandom: false;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.getCards();
    /* this.getRandomCards(); */
  }

  getCards() {
    this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    });
    this.id = 2;
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
  }

 /*  getRandomCards() {
    console.log(222);
    console.log(this.getRandom());
  }
 */
  getRandom() {
    /* const min = 1;
    const max = this.cards.length; */
    //Math.floor(Math.random() * (max - min + 1)) + min;
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  shuffle(array) {
    let m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  next() {
    console.log(this.id);
    if (this.id < this.cards.length) {
      this.id += 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
    console.log(this.cards);

  }

  prev() {
    if (this.id > 1) {
      this.id -= 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
  }

  amIRight() {
    this.numberOfCards = this.cards.length;
    this.answers += 1;
  }


}
