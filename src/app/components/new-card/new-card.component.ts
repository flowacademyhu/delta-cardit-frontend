import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {

  public decks: DeckModel[] = [];

  public card: CardModel = {};

  private question: string = null;
  private answer: string = null;
  private difficulty: number = null;
  private type: string = null;
  private deckId: number = null;


  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<NewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private route: ActivatedRoute,
    private cardsService: CardsService,
    private decksService: DecksService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.decks = decks;
      console.log(decks);
    });
  }


  edit() {
    this.cardsService.edit(this.card).subscribe((result) => {
      alert('Sikeres mentés!');
      this.router.navigate(['learningcard']);
    }, (error) => {
      console.log('Error', error);
    });
  }

  save() {
    this.card.deckId = this.deckId;
    this.card.question = this.question;
    this.card.answer = this.answer;
    this.card.difficulty = this.difficulty;
    this.card.type = this.type;
    this.cardsService.save(this.card).subscribe(result => {
      this.snack.open('Sikeres mentés!');
      this.router.navigate(['cardmode/' + this.deckId]);
      this.dialogRef.close();
    },
    err => {
      this.snack.open('Sikertelen mentés!');
      this.router.navigate(['cardmode/' + this.deckId]);
    });
  }

  isCreateMode(): boolean {
    return !this.card.id;
  }
}
