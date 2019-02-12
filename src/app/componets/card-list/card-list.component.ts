import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  public cards: CardModel[] = [];

  constructor(private httpClient: HttpClient, public dialog: MatDialog, private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.getAllCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditCardComponent, {
    });
  }

  destroy(id: number) {
      if (confirm('Biztos véglegesen törli a kártyát?')) {
        const url = `${'http://localhost:8000/cards'}/${id}`;
        return this.httpClient.delete(url).toPromise()
          .then(() => {
          this.ngOnInit();
          });
      }
    /* this.cardsService.delete(this.cards.id).subscribe((result) => {
      alert('A törlés sikeres!');
      this.router.navigate(['learningcard']);
    }); */
  }
}
