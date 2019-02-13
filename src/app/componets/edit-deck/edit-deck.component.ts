import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { Router, Params, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  public deck: DeckModel = {};

  public subject: string;

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
