import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  private card: CardModel = {} as CardModel;

  private decks: DeckModel[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router,
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private decksService: DecksService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.cardsService.getOne(params.id).subscribe((result: CardModel) => {
          this.card = result ? result : {} as CardModel;
        });
      }
    });
    this.loadDecks();
  }

  loadDecks() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.decks = decks;
      console.log(decks);
    });
  }

  update() {
    console.log(this.card);
      this.cardsService.edit(this.card).subscribe((result) => {
        this.snack.open('Mentés sikeres');
        this.router.navigate(['cardmode']);
      }, (error) => {
        alert('Mentés sikertelen!');
        console.log('Error', error);
      });
    }
  }

