import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { Router, Params, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss']
})
export class NewDeckComponent implements OnInit {

  public deck: DeckModel = {};

  public subject: string;

  public cardId: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private decksService: DecksService) { }

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

  save() {
    this.subject = this.deck.subject;
    this.cardId = this.deck.cardId;
    console.log(this.deck);
    this.decksService.save(this.deck).subscribe(result => {
      alert('Sikeres mentés!');
      this.router.navigate(['decks']);
    },
    err => {
      alert('Sikertelen mentés!');
      this.router.navigate(['decks']);
    });
  }
}