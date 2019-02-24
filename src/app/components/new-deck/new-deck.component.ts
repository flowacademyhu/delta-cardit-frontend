import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss']
})
export class NewDeckComponent implements OnInit {

  public deck: DeckModel = {};

  public subject: string;

  constructor(public dialogRef: MatDialogRef<NewDeckComponent>,
    private route: ActivatedRoute, private router: Router,
    private decksService: DecksService,
    private snack: MatSnackBar) { }

  ngOnInit() {

  }

  loadDecks() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.deck = decks;
    });
  }


  save() {
    this.subject = this.deck.subject;
    this.decksService.save(this.deck).subscribe(result => {
      this.snack.open('Sikeres mentés!');
      this.router.navigate(['subjects']);
      this.dialogRef.close();
      this.loadDecks();

    },
    err => {
      this.snack.open('Sikertelen mentés!');
      this.router.navigate(['subjects']);
    });
  }
}
