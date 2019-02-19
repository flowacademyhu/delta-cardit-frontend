import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewCardComponent } from '../new-card/new-card.component';
import { HttpClient } from '@angular/common/http';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private auth: AuthService) {
    this.auth.currentUser.subscribe(result => this.currentUser = result);
  }

  ngOnInit() {
    this.getDeck();
  }


  getDeck() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
          this.loadCardsByDeck(this.deck.id);
        });
      }
    });
  }


  loadCardsByDeck(id: number) {
    console.log(this.deck.id);
    this.cardsService.getAllFromDeck(id).subscribe(cards => {
      console.log(cards);
      this.cards = cards;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NewCardComponent, {
    }).afterClosed().subscribe(result => {
      this.loadCardsByDeck(this.deck.id);
    });
  }


  destroy(id: number) {
    if (confirm('Biztos véglegesen törli a kártyát?')) {
      const url = `${'http://localhost:8000/cards'}/${id}`;
      return this.httpClient.delete(url).toPromise()
        .then(() => {
          this.loadCardsByDeck(this.deck.id);
        });
    }
    /* this.cardsService.delete(this.cards.id).subscribe((result) => {
      alert('A törlés sikeres!');
      this.router.navigate(['learningcard']);
    }); */
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  get isStudent() {
    return this.currentUser && this.currentUser.role === 'student';
  }
}
