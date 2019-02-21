
import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  private deck: DeckModel = {} as DeckModel;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private decksService: DecksService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    console.log(this.deck.id);
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
        });
      }
    });
    console.log(this.deck.id);
  }

  update() {
    console.log(this.deck);
      this.decksService.edit(this.deck).subscribe((result) => {
        this.snack.open('Mentés sikeres');
        this.router.navigate(['subjects']);
      }, (error) => {
        this.snack.open('Mentés sikertelen!');
        console.log('Error', error);
      });
    }
  }
