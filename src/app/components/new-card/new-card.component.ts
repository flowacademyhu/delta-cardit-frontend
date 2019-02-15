import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {

  public card: CardModel = {};

  private question: string;
  private answer: string;
  private difficulty: number;
  private type: string;


  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private route: ActivatedRoute, private cardsService: CardsService) { }

  ngOnInit() {
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
    this.question = this.card.question;
    this.answer = this.card.answer;
    this.difficulty = this.card.difficulty;
    this.type = this.card.type;
    console.log(this.card);
    this.cardsService.save(this.card).subscribe(result => {
      alert('Sikeres mentés!');
      this.router.navigate(['learningcard']);
    },
    err => {
      alert('Sikertelen mentés!');
      this.router.navigate(['learningcard']);
    });
  }

  isCreateMode(): boolean {
    return !this.card.id;
  }
}