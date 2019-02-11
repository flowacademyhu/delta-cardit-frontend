import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditCardComponent } from '../edit-card/edit-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public cards: CardModel[] = [];

  public card: CardModel;

  constructor(public dialog: MatDialog, private cardsService: CardsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditCardComponent, {
    });
  }

  destroy() {
    this.cardsService.delete(this.card).subscribe((result) => {
      alert('A törlés sikeres!');
      this.router.navigate(['learningcard']);
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
}
