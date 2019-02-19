import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { all } from 'q';
import { DecksService } from 'src/app/services/decks.service';
import { HttpClient } from '@angular/common/http';
import { DeckModel } from 'src/app/models/deck.model';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cards: CardModel[] = [];

  public card: CardModel = {};

  public deck: DeckModel = {};

  public id: number;

  public answers: string = null;

  public numberOfCards: number = null;

  public isRandom = true;

  constructor(private cardsService: CardsService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getDeck();
    // this.getCards();
    /* this.getRandomCards(); */
  }

  getDeck() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.loadCardsByDeck(this.deck.id);
          // this.randomNoRepeats(this.cards);
        });
      }
    });
  }

  /* randomNoRepeats(cards) {
    let cardsCopy = cards.slice(0);
    console.log(cardsCopy);
    return function() {
      if (cardsCopy.length < 1) { cardsCopy = cards.slice(0); }
      const index = Math.floor(Math.random() * cardsCopy.length);
      const card = cardsCopy[index];
      cardsCopy.splice(index, 1);
      return card;
    };
  } */

  loadCardsByDeck(id: number) {
    console.log(id);
    this.cardsService.getAllFromDeck(id).subscribe(cards => {
      console.log(cards);
      this.cards = cards;
      if (this.isRandom) {
        this.shuffle(this.cards);
      }
      console.log(this.cards);
      this.getFirstCard();
      this.numberOfCards = this.cards.length;
    });
  }

  getFirstCard() {
    this.card = this.cards[0];
  }

  shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    console.log(cards);
  }

  reloadCards() {
    this.loadCardsByDeck(this.deck.id);
  }

  next() {
    let index = this.cards.indexOf(this.card);
    console.log(index);
    if (!(this.card === this.cards.pop)) {
      this.card = this.cards[index += 1];
    }

    /* console.log(this.id);
    if (this.id < this.cards.length) {
      this.id += 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    });
    console.log(this.cards); */

  }

  prev() {
    let index = this.cards.indexOf(this.card);
    console.log(index);
    if (!(this.card === this.cards[0])) {
      this.card = this.cards[index -= 1];
    }
    /* if (this.id > 1) {
      this.id -= 1;
    }
    this.cardsService.getOne(this.id).subscribe(card => {
      this.card = card;
    }); */
  }

  amIRight() {
    const index = (this.cards.indexOf(this.card));
    this.cards.splice(index, 1);
    console.log(this.cards);
    this.answers += 1;
    this.next();
  }

  iWasWrong() {
    this.next();
  }
}
