import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListContainer } from '@angular/cdk/drag-drop';
import { CardsService } from 'src/app/services/cards.service';
import { DecksService } from 'src/app/services/decks.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DeckModel } from 'src/app/models/deck.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  cards: CardModel[] = [];

  deck: DeckModel = {};

  cardsAnswers: CardModel[] = [];

  currentQuestionCard: CardModel = {};

  currentAnswerCard: CardModel = {};

  currentIndex: number;
  currentIndex2: number;

  constructor(private cardsService: CardsService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getDeck();
  }

  fillGameCards(id: number) {
    const cardObservable = this.cardsService.getAllFromDeck(id);
    cardObservable.subscribe((cardsData: CardModel[]) => {
      this.cards = [...cardsData];
      this.shuffle(this.cards);
      this.cardsAnswers = [...cardsData];
      this.shuffle(this.cardsAnswers);
    });
  }

  getDeck() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.fillGameCards(this.deck.id);
        });
      }
    });
  }



  shuffle(cards) {
    let m = cards.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = cards[m];
      cards[m] = cards[i];
      cards[i] = t;
    }
    return cards;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex);
    this.currentIndex = event.currentIndex;
    this.currentQuestionCard = (this.cardsAnswers[event.currentIndex]);
    this.isItRight();
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardsAnswers, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex);
    this.currentAnswerCard = (this.cardsAnswers[event.currentIndex]);
    this.currentIndex2 = event.currentIndex;
    this.isItRight();
  }

  getAnswerCard(event: CdkDropListContainer) {


  }

  /* dropCardAnswer(index: num){
    this.currentAnswerCard = (this.cardsAnswers[event.currentIndex]);
    this.currentIndex2 = event.currentIndex;
    console.log(this.currentAnswerCard);
    this.isItRight();
  } */

  isItRight() {
    /*  const dragCardAnswer = this.cardsAnswers[event.currentIndex]
     const dragCArdQuestion = this.cardQuestion[event.currentIndex]
     const answer = this.cards.filter(card => card.answer === this.cardAnswer);
     const question = this.cards.filter(card => card.question === this.cardQuestion); */

    /* if (this.currentQuestionCard === this.currentAnswerCard && this.currentIndex2 === this.currentIndex) {
      console.log(this.currentQuestionCard);
      console.log(this.currentAnswerCard);
      console.log(this.currentIndex2);
      console.log(this.currentIndex);
      this.openSnackBar();
    } */


    for (let i = 0; i < this.cards.length; i++) {
    if (this.cards[i] === this.cardsAnswers[i]
      && (this.cards[i] === this.currentQuestionCard || this.cardsAnswers[i] === this.currentAnswerCard)) {
      this.openSnackBar();
    }
    }
  }

  openSnackBar() {
    this.snack.open('Helyes megoldás!');
  }
}
