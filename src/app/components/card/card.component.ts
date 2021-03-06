import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';
import { HttpClient } from '@angular/common/http';
import { DeckModel } from 'src/app/models/deck.model';
import { MatSnackBar } from '@angular/material';



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

  public answers: number = null;

  public numberOfCards: number = null;

  public isRandom = false;

  public oneRound = true;

  constructor(private cardsService: CardsService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getDeck();
  }

  getDeck() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.loadCardsByDeck(this.deck.id);
        });
      }
    });
  }


  loadCardsByDeck(id: number) {
    this.cardsService.getAllFromDeck(id).subscribe(cards => {
      this.cards = cards;
      if (this.isRandom) {
        this.shuffle(this.cards);
      }
      this.getFirstCard();
      this.numberOfCards = this.cards.length;
      this.answers = 0;
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
  }

  reloadCards() {
    this.loadCardsByDeck(this.deck.id);
  }

  next() {
    let index = this.cards.indexOf(this.card);
    if (this.oneRound) {
      if (index !== this.cards.length - 1) {
        this.card = this.cards[index += 1];
      }
    } else if (index !== this.cards.length - 1) {
      this.card = this.cards[index += 1];
    } else {
      this.card = this.cards[0];
    }
  }


  prev() {
    let index = this.cards.indexOf(this.card);
    if (!(this.card === this.cards[0])) {
      this.card = this.cards[index -= 1];
    }
  }

  amIRight() {
    const index = (this.cards.indexOf(this.card));
    this.cards.splice(index, 1);
    if (this.answers < this.numberOfCards - 1 ) {
      this.answers += 1;
    } else if (this.answers < this.numberOfCards) {
      this.answers += 1;
      this.snack.open('Gratulálok, az összes választ tudtad!');
    }
    this.next();
  }

  iWasWrong() {
    this.next();
  }
}
