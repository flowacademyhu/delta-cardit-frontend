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


  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<NewDeckComponent>,
    private route: ActivatedRoute, private router: Router,
    private decksService: DecksService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    /* this.route.params.subscribe((params: Params) => {
      console.log(params);
      console.log(params.id);
      console.log('P' + params.id);
      this.decksService.getOne(params.id).subscribe((result) => {
        console.log('R' + result);
        this.deck = result ? result : {} as DeckModel;
      });
    }); */
  }

  loadDecks() {
    this.decksService.getAllDecks().subscribe(decks => {
      this.deck = decks;
    });
  }


  save() {
    this.subject = this.deck.subject;
    console.log(this.deck);
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
