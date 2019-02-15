import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/group.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  private card: CardModel = {} as CardModel;

  constructor(private router: Router, private route: ActivatedRoute, private cardsService: CardsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.cardsService.getOne(params.id).subscribe((result: CardModel) => {
          this.card = result ? result : {} as CardModel;
        });
      }
    });
  }

  update() {
    console.log(this.card);
      this.cardsService.edit(this.card).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['learningcards']);
      }, (error) => {
        alert('Mentés sikertelen!');
        console.log('Error', error);
      });
    }
  }

