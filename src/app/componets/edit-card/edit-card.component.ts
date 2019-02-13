import { Component, OnInit, Input, Output } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  public card: CardModel = {};

  private question: string;
  private answer: string;
  private difficulty: number;
  private type: string;


  constructor(private router: Router, private route: ActivatedRoute, private cardsService: CardsService) { }

  ngOnInit() {
  }


  toInt(value) {
    console.log(value, parseInt(value, 10));
    return parseInt(value, 10);
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
