import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecksService } from 'src/app/services/decks.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DeckModel } from 'src/app/models/deck.model';
import { ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { CardComponent } from '../card/card.component';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-card-mode',
  templateUrl: './card-mode.component.html',
  styleUrls: ['./card-mode.component.scss']
})
export class CardModeComponent implements OnInit {

  public deck: DeckModel = {} as DeckModel;


  constructor(
    private httpClient: HttpClient,
    private decksService: DecksService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
        });
      }
    });
  }
}
