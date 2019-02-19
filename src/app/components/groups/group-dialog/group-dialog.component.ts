import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { GroupsService } from 'src/app/services/groups.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DecksService } from 'src/app/services/decks.service';
import { DeckModel } from 'src/app/models/deck.model';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  private group: GroupModel = {};
  private decks: DeckModel[] = [];
  private selectedDecks: number[] = [];

  private name: string = null;

  constructor(private groupsService: GroupsService,
    private deckService: DecksService,
    private router: Router,
    private snack: MatSnackBar,
    private check: MatCheckboxModule) { }

  ngOnInit() {
    this.deckService.getAllDecks().subscribe(decks => {
      this.decks = decks;
    });
    console.log(this.decks);
  }

  /*getDecks() {
    this.deckService.getAllDecks().subscribe(decks => {
      this.decks = decks;
    });
  } */

    checkValue(event: any) {
    console.log(event.source.value);
    this.selectedDecks.push(event.source.value);
  }

  save() {
    this.group.name = this.name;
    console.log(this.group);
    this.groupsService.newGroup(this.group).subscribe(result => {
      this.router.navigate(['groups']).then(() => {
        this.snack.open('A mentés sikeres!', 'Ok', { duration : 3000});
      });
    },
    err => {
      this.router.navigate(['groups']).then(() => {
        this.snack.open('A mentés sikertelen!', 'Ok', { duration : 3000});
      });
    });
  }
}
