import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NewCardComponent } from '../new-card/new-card.component';
import { HttpClient } from '@angular/common/http';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { AuthService } from 'src/app/services/auth.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { CardComponent } from '../card/card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public cards: CardModel[] = [];

  public deck: DeckModel = {};

  private currentUser;

  constructor(
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private cardsService: CardsService,
    private decksService: DecksService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snack: MatSnackBar,
    private gameCardComponent: GameCardComponent,
    private cardComponent: CardComponent) {
    this.auth.currentUser.subscribe(result => this.currentUser = result);
  }

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
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NewCardComponent, {
    }).afterClosed().subscribe(result => {
      this.loadCardsByDeck(this.deck.id);
      this.gameCardComponent.fillGameCards(this.deck.id);
      this.cardComponent.loadCardsByDeck(this.deck.id);
    });
  }


  destroy(id: number) {
      const url = `${environment.apiUrl}/cards/${id}`;
      return this.httpClient.delete(url).toPromise()
        .then(() => {
          this.loadCardsByDeck(this.deck.id);
          this.snack.open('A törlés sikeres!', 'Ok', { duration : 3000});
        });
    }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === 'student';
  }
}
