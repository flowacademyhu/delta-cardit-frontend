import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-deck-statistics',
  templateUrl: './deck-statistics.component.html',
  styleUrls: ['./deck-statistics.component.scss']
})

export class DeckStatisticsComponent implements OnInit {
  private deck: DeckModel = {} as DeckModel;

  public cards: CardModel[] = [];

  public cardCount: number;

  public difficultyOneCount: number;

  public difficultyTwoCount: number;

  public difficultyThreeCount: number;

  public dataSource;
  public displayedColumns: string[] = ['name', 'count', 'easy', 'medium', 'hard'];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private decksService: DecksService,
    private snack: MatSnackBar,
    private cardsService: CardsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.loadCardsByDeck(this.deck.id);
          this.dataSource = new MatTableDataSource();
        });
      }
    });
    console.log(this.deck.id);
  }

  loadData() {
    // const data = [this.deck.subject, this.cardCount, this.difficultyOneCount, this.difficultyTwoCount,this.]
  }

  loadCardsByDeck(id: number) {
    console.log(this.deck.id);
    this.cardsService.getAllFromDeck(id).subscribe(cards => {
      console.log(cards);
      this.cards = cards;
      this.getCardCount();
    });
  }

  getCardCount() {
    this.cardCount = this.cards.length;
    this.getCardDifficulty();
  }

  getCardDifficulty() {
    const diffOne = this.cards.filter(card => card.difficulty === 1);
    this.difficultyOneCount = diffOne.length;
    const diffTwo = this.cards.filter(card => card.difficulty === 2);
    this.difficultyTwoCount = diffTwo.length;
    const diffThree = this.cards.filter(card => card.difficulty === 3);
    this.difficultyThreeCount = diffThree.length;
  }

}
