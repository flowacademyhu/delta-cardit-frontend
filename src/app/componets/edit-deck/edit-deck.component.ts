import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { DecksService } from 'src/app/services/decks.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  public deck: DeckModel;

  public subject: string;

  constructor(private router: Router, private decksService: DecksService, ) { }

  ngOnInit() {
  }

  save() {
    this.deck.subject = this.subject;
    console.log(this.deck);
    this.decksService.save(this.deck).subscribe(result => {
      alert('Sikeres mentés!');
      this.router.navigate(['learningcard']);
    },
    err => {
      alert('Sikertelen mentés!');
      this.router.navigate(['learningcard']);
    });
  }
}
