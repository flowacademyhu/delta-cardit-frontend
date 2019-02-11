import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  public card: CardModel;

  constructor(private router: Router, private route: ActivatedRoute, private cardsService: CardsService) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.cardsService.getOne(params.id).subscribe((result) => {
        this.card = result ? result : {} as CardModel;
      });
    });
  }

  save() {
    if (!this.isCreateMode) {
      this.cardsService.edit(this.card).subscribe((result) => {
        alert('Sikeres mentés!');
        this.router.navigate(['list']);
      }, (error) => {
        console.log('Error', error);
      });
    } else {
      this.cardsService.save(this.card).subscribe((result) => {
        alert('Sikeres mentés!');
        this.router.navigate(['list']);
      }, (error) => {
        console.log('Error', error);
      });

    }
  }

  isCreateMode(): boolean {
    return !this.card.id;
  }

}
