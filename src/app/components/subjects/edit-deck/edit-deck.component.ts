
import { Component, OnInit } from '@angular/core';
import { DeckModel } from 'src/app/models/deck.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DecksService } from 'src/app/services/decks.service';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  private deck: DeckModel = {} as DeckModel;

  constructor(private router: Router, private route: ActivatedRoute, private decksService: DecksService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.decksService.getOne(params.id).subscribe((result: DeckModel) => {
          this.deck = result ? result : {} as DeckModel;
        });
      }
    });
  }

  update() {
    console.log(this.deck);
      this.decksService.edit(this.deck).subscribe((result) => {
        alert('Mentés sikeres');
        this.router.navigate(['decks']);
      }, (error) => {
        alert('Mentés sikertelen!');
        console.log('Error', error);
      });
    }
  }