import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  cards: CardModel[] = [];

  cardsAnswers: CardModel[] = [];

  currentIndex: number;
  currentIndex2: number;

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    const cardObservable = this.cardsService.getAllCards();
    cardObservable.subscribe((cardsData: CardModel[]) => {
      this.cards = [...cardsData];
      this.shuffle(this.cards);
      this.cardsAnswers = [...cardsData];
      this.shuffle(this.cardsAnswers);
      console.log(this.cards);
      console.log(this.cardsAnswers);
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
    console.log(this.currentIndex);
  }

  drop2(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardsAnswers, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex);
    this.currentIndex2 = event.currentIndex;
    console.log(this.cardsAnswers);

  }

  isItRight() {
    if (this.currentIndex === this.currentIndex2) {
      console.log('true');
    }
  }

  /* drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  } */
}
