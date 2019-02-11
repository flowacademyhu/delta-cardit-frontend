import { Component, OnInit } from '@angular/core';
import { DecksService } from 'src/app/services/decks.service';
import { DeckModel } from 'src/app/models/deck.model';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  public decks: DeckModel[] = [];

  constructor(private decksService: DecksService) { }

  ngOnInit() {
    this.decksService.getAllCards().subscribe(decks => {
      this.decks = decks;
    });
  }
}
