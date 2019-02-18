import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { all } from 'q';
import { DecksService } from 'src/app/services/decks.service';
import { HttpClient } from '@angular/common/http';
import { DeckModel } from 'src/app/models/deck.model';
import { getRandomString } from 'selenium-webdriver/safari';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: CardModel[] = [];

  public card: CardModel;

  public deck: DeckModel = {};

  public id: number;

  public answers: string = null;

  public numberOfCards: number = null;

  public isRandom: false;

  constructor(private cardsService: CardsService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getDeck();
    //this.getCards();
    /* this.getRandomCards(); */
  }

  getDeck() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.loadCardsByDeck(this.deck.id);
          this.getCards();
          this.randomNoRepeats(this.cards);
        });
      }
    });
  }

  randomNoRepeats(cards) {
    let cardsCopy = cards.slice(0);
    console.log(cardsCopy);
    return function() {
      if (cardsCopy.length < 1) { cardsCopy = cards.slice(0); }
      const index = Math.floor(Math.random() * cardsCopy.length);
      const card = cardsCopy[index];
      cardsCopy.splice(index, 1);
      return card;
    };
  }

  loadCardsByDeck(id: number) {
    console.log(id);
    this.cardsService.getAllFromDeck(id).subscribe(cards => {
      console.log(cards);
      this.cards = cards;
    });
  }

  getCards() {
    /* this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    }); */
    this.id = this.getRandom().id;
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
